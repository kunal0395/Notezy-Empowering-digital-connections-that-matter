import qrcode
from io import BytesIO
import base64

def create_qr_code_image(url: str, file_path: str = None) -> bytes | str | None:
    """
    Generate a QR code for the given URL.

    Args:
        url (str): The URL to encode in the QR code.
        file_path (str, optional): If provided, saves the QR code image to this path.
                                   If None, returns QR code as raw PNG bytes.

    Returns:
        str | bytes | None: File path if saved, bytes if returned, None if error.
    """
    try:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        if file_path:
            img.save(file_path)
            return file_path
        else:
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            return buffer.getvalue()
    except Exception as e:
        print(f"[ERROR] Failed to create QR code image: {e}")
        return None

def generate_qr_code(url: str) -> str | None:
    """
    Generate a QR code for the given URL and return it as a base64-encoded PNG string.

    Args:
        url (str): The URL to encode in the QR code.

    Returns:
        str | None: Base64-encoded PNG string, or None if error occurs.
    """
    try:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        return base64.b64encode(buffer.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"[ERROR] Failed to create base64 QR code: {e}")
        return None
