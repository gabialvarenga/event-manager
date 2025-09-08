# Dockerfile para backend Spring Boot
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/data/event-manager.db /app/data/event-manager.db
RUN mkdir -p /app/data
EXPOSE 8081
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
