""" Brutal testing chamber """
from multiprocessing import Pool
from timeit import default_timer
from os import getpid
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

def loop_data(data):
    """ Looping data all the way """
    print(f'Spawning thread (pid {getpid()})')
    for _, val in enumerate(data):
        hashed = val.get('encrypt')
        requests.post(
            f"{GATEWAY_URL}/attendance",
            json={"data":hashed},
            timeout=None
        )


# Split data for thread
print(f"Splitting process for {len(database_data)} data to {THREAD_COUNT} thread.")
start_sending_data = default_timer()
database_data = np.array(database_data)
database_data = np.array_split(database_data, THREAD_COUNT)
print(len(database_data))
with Pool() as pool:
    pool.map(loop_data, database_data)

print(f'Done on {default_timer() - start_sending_data} seconds!')
