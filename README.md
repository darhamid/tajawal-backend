# Service Name
* Hotel App

## Service Detail:
* Store hotels details based on name, price, city and date availability.

## Service Architecture:

* Node.js Epxress backend.
* Mongodb

## Service Features:

01.  Save hotel information based on name, price city and date availability .

## Build Steps:

./start.sh

## Run Tests:

./test.sh

## Healthcheck:

01.  Endpoint: **/**
02.  Expected HTTP Response Code: **200**

## Service Logging:

01.  Log Levels supported: **trace, debug, info, warn, error, fatal**
02.  Default Loglevel: **debug**
03.  Log Formats supported: **Log4js**

## Environment Variables:

01. `APP_HOST=localhost` 
02. `APP_PORT=8000` 
03. `MONGO_DB_NAME=hoteldb` 
04. `MONGO_DB_URL=mongodb://tajawal-hotelapp-mongodb/hoteldb`
12. `LOGGER_CONFIG={"appenders":{"out":{"type":"stdout","layout":{"type":"pattern","pattern":"%[[%d] [%p] %c - %G{correlationId}%] - %m%n"}}},"categories":{"default":{"appenders":["out"],"level":"trace"}}}` 
13. `SWAGGER_URL=localhost:8000` 
14. `LOG_LEVEL = TRACE`
19. `ENABLE_SWAGGER=true`

## Codeclimate Badges

01. `[![Maintainability](https://api.codeclimate.com/v1/badges/c9af0f551697c589467a/maintainability)](https://codeclimate.com/github/darhamid/tajawal-backend/maintainability)`

02. `[![Test Coverage](https://api.codeclimate.com/v1/badges/c9af0f551697c589467a/test_coverage)](https://codeclimate.com/github/darhamid/tajawal-backend/test_coverage)`

## Service Dependencies:

### Upstream

### Downstream

01. MongoDB

## Database Required(if any):

01.  RO/RW data volume: **<RO>**
02.  Source of Data: **<Dev team>**
03.  Data injection process: **<N/A>**

## Ports Used:

01.  **8000**
02.  **29017**

### APIs

**1. Save hotel details**

  Api Url : {URL}/hotels
  
  Method : POST

  Description : store hotel details

  Body: 
  

``` json
    {
        "name" : "Hotel Grand Hyatt",
        "price" : 700,
        "city" : "Dubai",
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000",
                "to" : "2020-10-10T11:12:23.000"
            },
            {
                "from" : "2020-10-15T11:12:23.000",
                "to" : "2020-10-25T11:12:23.000"
            }
        ]
    }
   ```

   Response: 200 
   

``` json
   {
        "id" : "5e43b1a3e112ec0461f766b3",
        "name" : "Hotel Grand Hyatt",
        "price" : 700,
        "city" : "Dubai",
        "availability": [
            {
                "from" : "2020-10-05T11:12:23.000",
                "to" : "2020-10-10T11:12:23.000"
            },
            {
                "from" : "2020-10-15T11:12:23.000",
                "to" : "2020-10-25T11:12:23.000"
            }
        ],
        "__v": 0
}
```

**2. Update hotel details**

  Api Url : {URL}/hotels
  
  Method : PUT

  Description : store hotel details

  Body: 
  

``` json
    {
        "name" : "Hotel Grand Hyatt",
        "price" : 700,
        "city" : "Dubai",
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000",
                "to" : "2020-10-10T11:12:23.000"
            },
            {
                "from" : "2020-10-15T11:12:23.000",
                "to" : "2020-10-25T11:12:23.000"
            }
        ]
    }
   ```

   Response: 200 
   

``` json
   {
        "id" : "5e43b1a3e112ec0461f766b3",
        "name" : "Hotel Grand Hyatt",
        "price" : 700,
        "city" : "Dubai",
        "availability": [
            {
                "from" : "2020-10-05T11:12:23.000",
                "to" : "2020-10-10T11:12:23.000"
            },
            {
                "from" : "2020-10-15T11:12:23.000",
                "to" : "2020-10-25T11:12:23.000"
            }
        ],
        "__v": 0
}
```

**2. Get hotel by id**

  Api Url : {URL}/hotels/:id
  
  Method : GET

  Description : Get hotel by id

  Response: 200 
   

``` json
   {
        "id" : "5e43b1a3e112ec0461f766b3",
        "name" : "Hotel Grand Hyatt",
        "price" : 700,
        "city" : "Dubai",
        "availability": [
            {
                "from" : "2020-10-05T11:12:23.000",
                "to" : "2020-10-10T11:12:23.000"
            },
            {
                "from" : "2020-10-15T11:12:23.000",
                "to" : "2020-10-25T11:12:23.000"
            }
        ],
        "__v": 0
}
   ```

**3. Get all hotels**

  Api Url : {URL}/hotels?index=0&size=10
  
  Method : GET

  Description : Get all hotels

  Optional : index and size

  Response: 200 
   

``` json
   [{ 
        "_id" :"5e43b1a3e112ec0461f766b3", 
        "name" : "Hotel Grand Hyatt", 
        "price" : 700, 
        "city" : "Dubai", 
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000", 
                "to" : "2020-10-10T11:12:23.000"
            }, 
            {
                "from" : "2020-10-15T11:12:23.000", 
                "to" : "2020-10-25T11:12:23.000"
            }
        ], 
        "createdAt" : "2020-02-12T08:04:51.896", 
        "updatedAt" : "2020-02-12T11:23:48.115", 
        "__v" : 0
    }
    { 
        "_id" :"5e43d9ea2bcc31027102666a"), 
        "name" : "Al Bateen Hotel", 
        "price" : 600, 
        "city" : "Abu Dhabi", 
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000", 
                "to" : "2020-10-10T11:12:23.000"
            }, 
            {
                "from" : "2020-10-15T11:12:23.000", 
                "to" : "2020-10-25T11:12:23.000"
            }
        ], 
        "createdAt" : "2020-02-12T10:56:42.277", 
        "updatedAt" : "2020-02-12T10:56:42.277", 
        "__v" : 0)
    }
    { 
        "_id" :"5e43da502bcc31027102666b", 
        "name" : "Al Reem Hotel", 
        "price" : 600, 
        "city" : "Abu Dhabi", 
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000", 
                "to" : "2020-10-10T11:12:23.000"
            }
        ], 
        "createdAt" : "2020-02-12T10:58:24.909", 
        "updatedAt" : "2020-02-12T10:58:24.909", 
        "__v" : 0
    }]
}
   ```
**4. Delete hotel**

  Api Url : {URL}/hotels/:id
  
  Method : DELETE

  Description : Delete hotel based on id

  Response: 200 
   

``` json
   {
        "_id" :"5e43da502bcc31027102666b", 
        "name" : "Al Reem Hotel", 
        "price" : 600, 
        "city" : "Abu Dhabi", 
        "availability" : [
            {
                "from" : "2020-10-05T11:12:23.000", 
                "to" : "2020-10-10T11:12:23.000"
            }
        ], 
        "createdAt" : "2020-02-12T10:58:24.909", 
        "updatedAt" : "2020-02-12T10:58:24.909", 
        "__v" : 0
   }
```

