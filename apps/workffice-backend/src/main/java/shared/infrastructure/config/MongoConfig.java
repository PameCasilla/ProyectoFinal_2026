package shared.infrastructure.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import java.util.HashMap;
import java.util.List;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    // private final Environment env;
    private final String MONGO_HOST;
    private final String MONGO_DB;

    public MongoConfig(Environment env) throws EnvironmentConfigurationError {
        // this.env = env;
        ConfigUtil.verifyEnvVariables(new HashMap<>() {{
            put("mongo.host", env.getProperty("mongo.host"));
            put("mongo.db", env.getProperty("mongo.db"));
        }});
        this.MONGO_HOST = env.getProperty("mongo.host");
        this.MONGO_DB = env.getProperty("mongo.db");
    }

    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString(MONGO_HOST);
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        return MongoClients.create(mongoClientSettings);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), MONGO_DB);
    }

    @Bean
    public ApplicationRunner initializeMongoDatabase(MongoTemplate mongoTemplate) {
        return args -> {
            var databaseName = mongoTemplate.getDb().getName();
            var collectionsToCreate = List.of(
                    "news",
                    "news__office_branches",
                    "bookings",
                    "office",
                    "reviews",
                    "office_branches"
            );

            for (String collectionName : collectionsToCreate) {
                if (!mongoTemplate.collectionExists(collectionName)) {
                    mongoTemplate.createCollection(collectionName);
                    System.out.println("Created Mongo collection: " + collectionName);
                }
            }

            System.out.println("Mongo database ready: " + databaseName);
        };
    }
}
