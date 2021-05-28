package it.istat.graphservice.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.HandlerMapping;

@Controller
public class GraphServiceController {

	
	
	@Value("${python.server.url}")
	private String pythonServer;
	
 
	@RequestMapping("/")
	public String home(Model model) {

	    model.addAttribute("pythonServer", pythonServer);
		return "index";
	}
        
	@RequestMapping("/distance")
	public String distance(Model model) {
		  model.addAttribute("pythonServer", pythonServer);
 		return "we/distance";
	}
	
	@RequestMapping("/analogy")
	public String analogy(Model model) {
		  model.addAttribute("pythonServer", pythonServer);
 		return "we/analogy";
	}
	
	
	@RequestMapping("/graph")
	public String graph(Model model) {
		  model.addAttribute("pythonServer", pythonServer);
	 
		return "we/graph";
	}

	

	@RequestMapping(value = "/graphpy/**", method = RequestMethod.GET)
	@ResponseBody
	public String graphGET(Model model, HttpServletRequest request) throws IOException {
		String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		String bestMatchPattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);

		AntPathMatcher apm = new AntPathMatcher();
		String finalPath = apm.extractPathWithinPattern(bestMatchPattern, path);
		URL url;

		StringBuffer inputLinebuff = new StringBuffer();
	
			// get URL content
			String url_service = pythonServer + finalPath;
			url = new URL(url_service);
			URLConnection conn = url.openConnection();

			// open the stream and put it into BufferedReader
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String inputLine;

			while ((inputLine = br.readLine()) != null) {
				inputLinebuff.append(inputLine);
				// System.out.println(inputLine);
			}
			br.close();

			// System.out.println("Done");

		
	 
	 
		return inputLinebuff.toString();

	}
 
	@RequestMapping(value = "/graph2", method = RequestMethod.POST)
	@ResponseBody
	public String graphposth2(Model model, @RequestParam(value = "width") String width,
			@RequestParam(value = "iterations") String iterations, @RequestParam(value = "modo") String modo,
			@RequestParam(value = "text") String text) throws IOException {
		StringBuffer sb = new StringBuffer();
		Runtime rt = Runtime.getRuntime();
		// Process pr = rt.exec(cmd);
		Process pr;

		pr = rt.exec(" /DATI-WE/SEMANTIC_GRAPH/runSGE.sh " + width + " " + iterations + " " + modo + " " + text);

		// retrieve output from python script
		BufferedReader bfr = new BufferedReader(new InputStreamReader(pr.getInputStream()));

		String line = "";
		while ((line = bfr.readLine()) != null) {
			// display each output line form python script
			sb.append(line);
		}

		BufferedReader bfrError = new BufferedReader(new InputStreamReader(pr.getErrorStream()));

		String lineE = "";
		while ((lineE = bfrError.readLine()) != null) {
			// display each output line form python script
			sb.append(lineE);
		}

		return sb.toString();
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/graph2/{width}/{iterations}/{modo}/{text}", method = RequestMethod.GET)
	@ResponseBody
	public String graphGET2(Model model, @PathVariable("width") String width, @PathVariable("iterations") String iterations
			, @PathVariable("modo") String modo, @PathVariable("text") String text) throws IOException {
		StringBuffer sb = new StringBuffer();
		
		// create runtime to execute external command
		Runtime rt = Runtime.getRuntime();
		// Process pr = rt.exec(cmd);
		Process pr;

		// pr = rt.exec( "python /DATI-WE/SemanticExplorer.py "+urlParameters);

		// pr = rt.exec( "python /home/framato/fra.py "+urlParameters);
		//pr = rt.exec("/DATI-WE/SEMANTIC_GRAPH/runSGE.sh 5 5 GEO [sei,una,pippa]  ");
		pr = rt.exec(" /DATI-WE/SEMANTIC_GRAPH/runSGE.sh " + width + " " + iterations + " " + modo + " " + text);

		// retrieve output from python script
		BufferedReader bfr = new BufferedReader(new InputStreamReader(pr.getInputStream()));

		String line = "";
		while ((line = bfr.readLine()) != null) {
			// display each output line form python script
			sb.append(line);
		}

		BufferedReader bfrError = new BufferedReader(new InputStreamReader(pr.getErrorStream()));

		String lineE = "";
		while ((lineE = bfrError.readLine()) != null) {
			// display each output line form python script
			sb.append(lineE);
		}

		return sb.toString();
	}

	 

}
