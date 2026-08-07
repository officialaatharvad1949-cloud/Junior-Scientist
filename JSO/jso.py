from fastapi import APIRouter, Form
from google_sheet import get_sheet

router = APIRouter()

sheet = get_sheet("JSO")


@router.post("/JSO/register")
def register_student(
    full_name: str = Form(...),
    phone: str = Form(...),
    alt_phone: str = Form(default=""),
    email: str = Form(...),
    school: str = Form(...),
    city: str = Form(...),
    student_class: str = Form(...)
):

    new_row = [
        full_name,
        phone,
        alt_phone,
        email,
        school,
        city,
        student_class
    ]

    sheet.append_row(new_row)

    return {
        "status": "success",
        "message": "Saved Successfully!"
    }