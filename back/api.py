from unicodedata import name
import geojson
from typing import Generator

from pandas import json_normalize
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#//////////////
# FAKE DATABSE
path = "/home/armando/Repos/TALEND/back/data/bosques_urbanos.geojson"
path_c ="/home/armando/Repos/TALEND/back/data/bosques_carbon.geojson"

async def get_data_from_file(file_path: str) -> Generator:
    with open(file=file_path, mode="rb") as file_like:
        yield file_like.read()

# TABLES
urban_table = json_normalize(geojson.load(open(path))["features"])
carbon_table = json_normalize(geojson.load(open(path_c))["features"])

#//////////////

@app.get("/")
def read_main():
    return {
        "routes": [
            {"method": "GET", "path": "/", "summary": "Landing"},
            {"method": "GET", "path": "/status", "summary": "App status"},
            {"method": "GET", "path": "/geojson", "summary": "download .geojson"},
            {"method": "GET", "path": "/bosques", "summary": "query coordinates"},
        ]
    }


@app.get("/status")
def get_status():
    return {"status": "ok"}



@app.get("/geojson")
async def geojson():
    file_contents = get_data_from_file(path)
    response = FileResponse(
       path,
        media_type="application/json",
    )
    return response

@app.get("/bosques/{item_id}")
def get_graph(item_id: int):
    row = urban_table[urban_table["properties.id"]==item_id].set_index("properties.id")
    return [row["properties.nombre"].values[0], row["properties.desc"].values[0], [t[::-1] for t in row["geometry.coordinates"].values[0][0][0]] ]


@app.get("/carbono/{item_id}")
def get_graph(item_id: int):
    row = carbon_table[carbon_table["properties.id"]==item_id].set_index("properties.id")
    return [row["properties.nombre"].values[0], row["properties.desc"].values[0], [t[::-1] for t in row["geometry.coordinates"].values[0][0][0]], round(row["properties.area_copa"].values[0]*100, 2), row["properties.acervo_co2"].values[0]]
