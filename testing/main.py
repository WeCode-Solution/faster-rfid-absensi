""" Brutal testing chamber """
import threading
import requests
from decouple import config

GATEWAY_URL = config('GATEWAY_URL')
CARD_GENERATED = config('CARD_GENERATED')
THREAD_COUNT = config('THREAD_COUNT')

print('Fetching data to database')
data = requests.post(
    f"{GATEWAY_URL}/generate",
    json={"count": int(CARD_GENERATED)},
    timeout=None
).json().get('data')

def send_attendance(hashed):
    """ Sending data to database """
    req = requests.post(
        f"{GATEWAY_URL}/attendance",
        json={"data":hashed},
        timeout=None
    )
    print(data)

for i, val in enumerate(data):
    data_hash = val.get('encrypt')
    x = threading.Thread(target=send_attendance(data_hash))
    x.start()
