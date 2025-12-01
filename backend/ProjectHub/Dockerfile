# 1️⃣ Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything into the container
COPY . .

# Restore dependencies
RUN dotnet restore

# Publish in Release mode
RUN dotnet publish -c Release -o /app

# 2️⃣ Runtime Stage (much smaller image)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app .

# Render requires you to expose port 8080
EXPOSE 8080

ENV ASPNETCORE_ENVIRONMENT=Docker

# Tell ASP.NET to listen on port 8080
ENV ASPNETCORE_URLS=http://+:8080

# START the API
ENTRYPOINT ["dotnet", "ProjectHub.dll"]
