echo "----build---"
yarn && yarn build
echo "----remove build runtime---"
rm -rf run_client/build
echo "----copy build---"
cp -r build run_client
echo "----remove build client---"
rm -rf build
echo "----build image----"
docker-compose build --build-arg http_proxy="$http_proxy" --build-arg https_proxy="$https_proxy"
echo "----push image----"
docker-compose push