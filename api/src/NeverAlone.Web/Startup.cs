using System;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NeverAlone.Business.Mapping;
using NeverAlone.Business.Services.Caching;
using NeverAlone.Business.Services.Contacts;
using NeverAlone.Business.Services.ExpoPushNotificationTokens;
using NeverAlone.Business.Services.MonitoredLocations;
using NeverAlone.Business.Services.Monitors;
using NeverAlone.Business.Services.Notes;
using NeverAlone.Business.Services.Settings;
using NeverAlone.Business.Services.Users;
using NeverAlone.Data.Configuration;
using NeverAlone.Data.DAL.Repositories.Contacts;
using NeverAlone.Data.DAL.Repositories.ExpoPushNotificationTokens;
using NeverAlone.Data.DAL.Repositories.MonitoredLocations;
using NeverAlone.Data.DAL.Repositories.Monitors;
using NeverAlone.Data.DAL.Repositories.Notes;
using NeverAlone.Data.DAL.Repositories.RefreshTokens;
using NeverAlone.Data.DAL.Repositories.Settings;
using NeverAlone.Data.DAL.Repositories.Users;
using NeverAlone.Data.DataContext;
using NeverAlone.Data.Models;
using NeverAlone.Web.Extensions;
using NeverAlone.Web.MiddleWare.Authentication;
using NeverAlone.Web.Services;
using NeverAlone.Web.Services.ApplicationUserManager;
using StackExchange.Redis;

namespace NeverAlone.Web;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

        services.AddScoped<IContactRepository, ContactRepository>();
        services.AddScoped<IContactService, ContactService>();

        services.AddScoped<IMonitorLocationRepository, MonitorLocationRepository>();
        services.AddScoped<IMonitorLocationService, MonitorLocationService>();

        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddScoped<INoteService, NoteService>();

        services.AddScoped<IMonitorRepository, MonitorRepository>();
        services.AddScoped<IMonitorService, MonitorService>();

        services.AddScoped<IApplicationUserManager, ApplicationUserManager>();
        services.AddScoped<ICacheService, CacheService>();

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();

        services.AddScoped<IExpoPushNotificationTokenRepository, ExpoPushNotificationTokenRepository>();
        services.AddScoped<IExpoPushNotificationTokenService, ExpoPushNotificationTokenService>();

        services.AddScoped<ISettingRepository, SettingRepository>();
        services.AddScoped<ISettingService, SettingService>();

        var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new NeverAloneProfile()); });
        var mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        var key = Environment.GetEnvironmentVariable("NEVER_ALONE_JWTSecret",
            EnvironmentVariableTarget.Process);

        var tokenValidationParams = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key ?? throw new InvalidOperationException())),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            RequireExpirationTime = false,
            ClockSkew = TimeSpan.Zero
        };

        services.AddSingleton(tokenValidationParams);

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(jwt =>
            {
                jwt.SaveToken = true;
                jwt.TokenValidationParameters = tokenValidationParams;
            });

        services.AddDefaultIdentity<ApplicationUser>(options =>
        {
            options.SignIn.RequireConfirmedAccount = true;
            options.Password.RequireDigit = false;
            options.User.RequireUniqueEmail = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 0;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        }).AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddControllers();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "NeverAlone", Version = "v1" });
            c.AddSecurityDefinition("BearerAuth", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme.ToLowerInvariant(),
                In = ParameterLocation.Header,
                Name = "Authorization",
                BearerFormat = "JWT",
                Description = "JWT Authorization header using the Bearer scheme."
            });

            c.OperationFilter<AuthenticationResponsesOperationFilter>();
        });

        services.AddStackExchangeRedisCache(options =>
        {
            options.ConfigurationOptions = new ConfigurationOptions
            {
                EndPoints = { { ApplicationStartupOptions.RedisHost, 6379 } },
                Password = ApplicationStartupOptions.RedisPassword,
                ConnectTimeout = 50,
                ConnectRetry = 1
            };
        });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        services.AddLocalization();

        services.Configure<RouteOptions>(options =>
        {
            options.ConstraintMap.Add("culture", typeof(LanguageRouteConstraint));
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NeverAlone v1"));
        }

        app.UseCors("AllowAll");

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.ConfigureCustomExceptionMiddleware();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}