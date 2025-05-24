import psycopg2
from config import DATABASE_CONFIG

def get_db_connection():
    """
    Establish and return a new connection to the PostgreSQL database using
    configuration from DATABASE_CONFIG.

    Returns:
        psycopg2.extensions.connection: A new database connection object.

    Raises:
        Exception: If the connection fails, the exception is raised to the caller.
    """
    try:
        conn = psycopg2.connect(
            dbname=DATABASE_CONFIG["dbname"],
            user=DATABASE_CONFIG["user"],
            password=DATABASE_CONFIG["password"],
            host=DATABASE_CONFIG["host"],
            port=DATABASE_CONFIG["port"],
        )
        return conn
    except Exception as e:
        print(f"[ERROR] Database connection failed: {e}")
        raise
