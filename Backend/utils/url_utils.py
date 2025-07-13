import random
import os
import string
import psycopg2
from datetime import date
from config import DATABASE_CONFIG

BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:5173") 

def generate_short_url(length: int = 6) -> str:
    """
    Generate a random short URL using alphanumeric characters.

    Args:
        length (int): Length of the random string. Default is 6.

    Returns:
        str: Generated short URL with local domain.
    """
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))


def create_db_connection():
    """
    Create and return a PostgreSQL database connection.

    Returns:
        connection: psycopg2 connection object or None on failure.
    """
    try:
        return psycopg2.connect(**DATABASE_CONFIG)
    except Exception as e:
        print(f"[ERROR] Database connection failed: {e}")
        return None


def shorten_url(user_url: str) -> str:
    """
    Wrapper to generate a short URL for a given user URL.

    Args:
        user_url (str): Original URL submitted by the user.

    Returns:
        str: Shortened URL.
    """
    return generate_short_url()


def get_long_url(new_url: str) -> str | None:
    """
    Retrieve the original long URL from the database based on the shortened URL.

    Args:
        new_url (str): The shortened URL slug (e.g., /abc123).

    Returns:
        str | None: The original long URL if found, else None.
    """
    connection = None
    try:
        connection = create_db_connection()
        if connection is None:
            raise Exception("Failed to connect to the database")

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT user_url FROM url WHERE new_url = %s;
            """, (new_url,))
            result = cursor.fetchone()
            return result[0] if result else None

    except Exception as e:
        print(f"[ERROR] Failed to retrieve long URL for '{new_url}': {e}")
        return None

    finally:
        if connection:
            connection.close()
