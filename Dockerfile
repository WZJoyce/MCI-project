FROM nginx
COPY testScript.java .
RUN javac testScript.java
CMD java testScript