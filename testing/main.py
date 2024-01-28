""" Brutal testing chamber """
from multiprocessing import Pool
from timeit import default_timer
from os import getpid, popen
from datetime import datetime
import pickle
import subprocess
import requests
import numpy as np
from decouple import config

GATEWAY_URL = config('GATEWAY_URL')
WEBSERVER_URL = config('WEBSERVER_URL')
CARD_GENERATED = config('CARD_GENERATED')
THREAD_COUNT = int(config('THREAD_COUNT'))
REDIS_SUB_PID = config('REDIS_SUB_PID')
WEBSERVER_PID = config('WEBSERVER_PID')
CLEAN_RUN = int(config('CLEAN_RUN'))

print('Fetching data from database')
database_data = requests.post(
    f"{GATEWAY_URL}/generate",
    json={"count": int(CARD_GENERATED)},
    timeout=None
).json().get('data')
print(f"Get {len(database_data)} data")

def read_ram_usage(pid):
    """ Check RAM Usage """
    smaps = subprocess.run(
        ['cat', f'/proc/{pid}/smaps'], check=True, capture_output=True
    )
    pss = subprocess.run(
        ['grep', '-i', 'pss'], input=smaps.stdout, check=True, capture_output=True
    )
    awk = subprocess.run(
        ['awk', '{Total+=$2} END {print Total}'], input=pss.stdout, check=True, capture_output=True
    )
    return int(awk.stdout.decode('utf-8').strip())

def read_cpu_usage():
    """ Check CPU Usage """
    return str(round(float(popen('''grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage }' ''').readline()),10))

def loop_data_to_redis(data):
    """ Looping data all the way """
    print(f'Spawning thread (pid {getpid()}) [{len(data)}]')
    result_loop = []
    start_time = default_timer()
    for _, val in enumerate(data):
        hashed = val.get('encrypt')
        requests.post(
            f"{GATEWAY_URL}/attendance",
            json={"data":hashed},
            timeout=None
        )
        result_loop.append({
            "ram": read_ram_usage(REDIS_SUB_PID) if CLEAN_RUN == 0 else False,
            "cpu": read_cpu_usage() if CLEAN_RUN == 0 else False,
            "start": start_time,
            "stop": default_timer() - start_time
        })
        start_time = default_timer()
    return result_loop

def loop_data_to_laravel(data):
    """ Looping data all the way """
    print(f'Spawning thread (pid {getpid()}) [{len(data)}]')
    result_loop = []
    start_time = default_timer()
    for _, val in enumerate(data):
        id_user = val.get('id')
        time = datetime.now().isoformat()
        requests.post(
            f"{WEBSERVER_URL}/api/attendance",
            json={"id":id_user, "recorded_at":time},
            timeout=None
        )
        result_loop.append({
            "ram": read_ram_usage(WEBSERVER_PID) if CLEAN_RUN == 0 else False,
            "cpu": read_cpu_usage() if CLEAN_RUN == 0 else False,
            "start": start_time,
            "stop": default_timer() - start_time
        })
        start_time = default_timer()
    return result_loop

# Split data for thread
print(f"Splitting process for {len(database_data)} data to {THREAD_COUNT} thread.")
database_data = np.array(database_data)
database_data = np.array_split(database_data, THREAD_COUNT)

print('\nStart testing for Redis')
start_sending_data = default_timer()
with Pool() as pool:
    redis_result = pool.map(loop_data_to_redis, database_data)
redis_total_time = default_timer() - start_sending_data
print(f'Done on {default_timer() - start_sending_data} seconds!')

print('\nStart testing for Laravel/Direct')
start_sending_data = default_timer()
with Pool() as pool:
    laravel_result = pool.map(loop_data_to_laravel, database_data)
laravel_total_time = default_timer() - start_sending_data
print(f'Done on {default_timer() - start_sending_data} seconds!')

result = (redis_result, laravel_result, redis_total_time, laravel_total_time)
with open('./result.dat', 'wb') as f:
    pickle.dump(result, f)
print('Save the result on result.dat')
