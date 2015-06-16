package it.siletto.test;

import java.io.File;

import org.atmosphere.container.Jetty9AsyncSupportWithWebSocket;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereServlet;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.ForwardedRequestCustomizer;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.HttpConfiguration;
import org.eclipse.jetty.server.HttpConnectionFactory;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class Main {

    public static void main(String[] args) throws Exception {
        Main main = new Main();
        main.run();
    }

    private void run() throws Exception {
        Server server = new Server();

        HttpConfiguration http_config = new HttpConfiguration();
        http_config.addCustomizer(new ForwardedRequestCustomizer());

        ServerConnector http = new ServerConnector(server, new HttpConnectionFactory(http_config));
        http.setPort(8080);
        http.setIdleTimeout(30000);

        server.setConnectors(new Connector[]{http});

        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setWelcomeFiles(new String[]{ "index.html" });

        resource_handler.setResourceBase(new File("src/main/webapp").getAbsolutePath());

        ServletHolder atmosphereServletHolder = new ServletHolder(AtmosphereServlet.class);

        atmosphereServletHolder.setInitParameter(ApplicationConfig.ANNOTATION_PACKAGE, "it.siletto.test");
        atmosphereServletHolder.setInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
        atmosphereServletHolder.setInitParameter(ApplicationConfig.PROPERTY_COMET_SUPPORT, Jetty9AsyncSupportWithWebSocket.class.getName());

        atmosphereServletHolder.setAsyncSupported(true);

        ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        servletContextHandler.addServlet(atmosphereServletHolder, "/test-ws/*");


        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] { resource_handler, servletContextHandler });

        server.setHandler(handlers);
        server.setStopAtShutdown(true);
        server.start();
        server.join();
    }
}
