from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Modelothon import modelothon
from Mathamaze import mathamaze
from JSO import jso
from Catapultikon import catapultikon
from Exquizit import exquizit
from Arduinoexp import arduinoexp
from MUN import mun


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(modelothon.router)
app.include_router(mathamaze.router)
app.include_router(jso.router)
app.include_router(catapultikon.router)
app.include_router(exquizit.router)
app.include_router(arduinoexp.router)
app.include_router(mun.router)
