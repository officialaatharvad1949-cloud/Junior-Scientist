import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

creds = ServiceAccountCredentials.from_json_keyfile_name(
    "credential.json",
    scope
)

client = gspread.authorize(creds)

spreadsheet = client.open_by_key(
    "1aya8gFQ-vauhAIjSuLYaoWGZXrMoJvyysdfrBMwmoKM"
)

def get_sheet(sheet_name):
    return spreadsheet.worksheet(sheet_name)