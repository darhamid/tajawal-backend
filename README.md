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
02.  **27017**

### APIs

**1. Save hotel details**

  Api Url : {URL}/hotels
  
  Method : POST

  Authorization: Required

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

**2. Get milestone by id**

  Api Url : {URL}/hotels/:id
  
  Method : GET

  Authorization: Required

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

  Authorization: Required

  Description : Get all hotels

  Optional : index and size

  Response: 200 
   

``` json
   {
    "_id": "rewards_added@1.0.0",
    "type": "rewards_added",
    "version": "1.0.0",
    "isEnabled": true,
    "milestones": [{
            "id": "milestone100",
            "title": "You've earned your first 100 points. 💯",
            "message": "Great start! 🙂",
            "expression": "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
            "stastics": {
                "milestoneValue": 100
            }
        },
        {
            "id": "milestone500",
            "title": "You've earned your first 500 points. ✔",
            "message": "Well done! You're getting the hang of it. 😉",
            "expression": "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
            "stastics": {
                "milestoneValue": 500
            }
        },
        {
            "id": "milestone1000",
            "title": "You now have 1000 points. 🧨",
            "message": "Way to go! Looks like you're enjoying it. 😃",
            "expression": "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
            "stastics": {
                "milestoneValue": 1000
            }
        },
        {
            "id": "milestone2000",
            "title": "You now have 2000 points. ✨",
            "message": "Yay! Hardcore learner in the house. 😁",
            "expression": "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
            "stastics": {
                "milestoneValue": 2000
            }
        }
    ],
    "__v": 0
}
   ```
**4. Delete hotel**

  Api Url : {URL}/hotels/:id
  
  Method : DELETE

  Authorization: Required

  Description : Delete hotel based on id

  Response: 200 
   

``` json
   {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
   }
   ```

