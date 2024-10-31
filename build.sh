#!/bin/bash

cp .env.kr .env
docker build -t krbank-ui .

cp .env.us .env
docker build -t usbank-ui .

cp .env.mx .env
docker build -t mxbank-ui .

cp .env.kr .env