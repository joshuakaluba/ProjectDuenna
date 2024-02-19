FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build-env
WORKDIR /app

# Copy csproj
COPY ./src/NeverAlone.Web/NeverAlone.Web.csproj ./NeverAlone.Web/NeverAlone.Web.csproj
COPY ./src/NeverAlone.Data/NeverAlone.Data.csproj ./NeverAlone.Data/NeverAlone.Data.csproj
COPY ./src/NeverAlone.Business/NeverAlone.Business.csproj ./NeverAlone.Business/NeverAlone.Business.csproj

# Restore as distinct layers
RUN dotnet restore ./NeverAlone.Web/NeverAlone.Web.csproj

# Copy everything else and build
COPY ./src/ ./
RUN dotnet publish ./NeverAlone.Web/NeverAlone.Web.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "NeverAlone.Web.dll"]