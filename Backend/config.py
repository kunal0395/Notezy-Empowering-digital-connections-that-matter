import os
from urllib.parse import urlparse

DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL is None:
    raise Exception("DATABASE_URL not set")

result = urlparse(DATABASE_URL)

DATABASE_CONFIG = {
    "dbname": result.path[1:],
    "user": result.username,
    "password": result.password,
    "host": result.hostname,
    "port": result.port,
}
