FROM adoptopenjdk/openjdk11:ubi
RUN mkdir /opt/app
COPY ./build/libs/forum.api-0.0.1-SNAPSHOT.jar /opt/app
CMD ["java", "-jar", "/opt/app/forum.api-0.0.1-SNAPSHOT.jar"]