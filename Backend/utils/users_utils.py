import psycopg2
from psycopg2 import sql
from config import DATABASE_CONFIG

def get_last_id(table_name: str, id_column: str) -> int:
    """
    Get the highest ID from a given table's primary key column.

    Args:
        table_name (str): Name of the table to query.
        id_column (str): Name of the ID/primary key column.

    Returns:
        int: The highest ID value or 0 if table is empty or on error.
    """
    connection = None
    cursor = None

    try:
        # Establish a connection to PostgreSQL using config
        connection = psycopg2.connect(**DATABASE_CONFIG)
        cursor = connection.cursor()

        # Safely construct the SQL query to get the max ID
        query = sql.SQL("SELECT MAX({id}) FROM {table}").format(
            id=sql.Identifier(id_column),
            table=sql.Identifier(table_name)
        )

        cursor.execute(query)
        result = cursor.fetchone()
        last_id = result[0] if result[0] is not None else 0

        return last_id

    except Exception as e:
        print(f"[ERROR] Failed to fetch last ID from '{table_name}': {e}")
        return 0

    finally:
        # Ensure the DB connection is properly closed
        if cursor:
            cursor.close()
        if connection:
            connection.close()
