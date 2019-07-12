FROM gcc
COPY . /usr/src/
WORKDIR /usr/src/
RUN g++ -std=c++14 Test.cpp -o Test

CMD ./Test