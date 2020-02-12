
echo "Checking for network..."
docker network ls | grep "oryx" >/dev/null
if [[ ! $? -eq 0 ]]
then
    echo "Installing network for oryx containers..."
    docker network create oryx
fi

docker build . -f dev.Dockerfile -t tajawal-hotelapp:local
sh stop.sh

echo "starting mongodb"

#Use this if using mongo in replica set.
docker run --rm -d --name=tajawal-hotelapp-mongodb --network=oryx  -p 29017:27017  -v tajawal-hotelapp-mongodb-volume:/data/db  mvertes/alpine-mongo

sleep 3s