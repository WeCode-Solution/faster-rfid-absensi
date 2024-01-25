""" Brutal testing chamber """
import threading
from multiprocessing import Process
import requests
import numpy as np
from decouple import config

GATEWAY_URL = config('GATEWAY_URL')
CARD_GENERATED = config('CARD_GENERATED')
THREAD_COUNT = int(config('THREAD_COUNT'))

print('Fetching data to database')
database_data = requests.post(
    f"{GATEWAY_URL}/generate",
    json={"count": int(CARD_GENERATED)},
    timeout=None
).json().get('data')
print(f"Get {len(database_data)} data")

def send_attendance(hashed):
    """ Sending data to database """
    requests.post(
        f"{GATEWAY_URL}/attendance",
        json={"data":hashed},
        timeout=None
    )

def loop_data(data):
    """ Spawining daemon thread for nesting multithread """
    data_process = [Process(target=send_attendance(val)) for _, val in enumerate(data)]
    for proc in data_process:
        proc.start()
    for proc in data_process:
        proc.join()

# Split data for thread
database_data = np.array(database_data)
database_data = np.array_split(database_data, THREAD_COUNT)
print(f"Splitting process for {len(database_data)} data to {THREAD_COUNT} thread.")
processes = [Process(target=loop_data(datas)) for _, datas in enumerate(database_data)]
for r in processes:
    r.start()
for r in processes:
    r.join()

print('Done!')
