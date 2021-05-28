package it.istat.graphservice;

import org.springframework.boot.SpringApplication;
 
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

import org.springframework.context.annotation.PropertySource;
 


@PropertySource(value = { "classpath:application.properties" })
//@EnableDiscoveryClient
@SpringBootApplication
public class GraphServiceApplication  extends SpringBootServletInitializer{

	 
	
	
	public static void main(String[] args) {
	 
	
		SpringApplication.run(GraphServiceApplication.class, args);
	}
	
	

	
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		
		return application.sources(GraphServiceApplication.class);
	}
}
