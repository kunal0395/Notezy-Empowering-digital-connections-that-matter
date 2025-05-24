import psycopg2
import string
import random
from config import DATABASE_CONFIG
from db_notezy import get_db_connection  # Assuming this returns a new DB connection

def generate_unique_link(length: int = 6) -> str:
    """
    Generate a unique 6-character alphanumeric link for notes.

    This function checks the database to ensure the generated link
    doesn't already exist in the 'notes' table.

    Args:
        length (int): Length of the generated link string.

    Returns:
        str: A unique link string.
    """
    characters = string.ascii_letters + string.digits

    while True:
        note_link = ''.join(random.choices(characters, k=length))

        try:
            # Open a fresh connection for each check to avoid stale connections
            conn = get_db_connection()
            cursor = conn.cursor()

            query = "SELECT note_link FROM notes WHERE note_link = %s;"
            cursor.execute(query, (note_link,))
            result = cursor.fetchone()

            cursor.close()
            conn.close()

            # If no existing record, link is unique
            if not result:
                return note_link

        except Exception as e:
            # Raising exception to be handled by caller or higher-level error handler
            raise Exception(f"[ERROR] Checking unique note link failed: {e}")
