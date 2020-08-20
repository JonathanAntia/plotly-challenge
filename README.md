# plotly-challenge
Step 1: Plotly


Use the D3 library to read in samples.json.


Consider a specific individual/person (test subject ID 940)


Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs (microbial species) found in the test subject 940.




Use sample_values as the values for the bar chart.


Use <otu_id>: <genus> as the labels for the bar chart. The otu_labels are taxonomies that follow the taxonomic rank - Kingdom (or Domain in the case of Archaea); Phylum; Subphylum; Order; Family; Genus


Use otu_labels as the hovertext for the chart.




Create another horizontal bar chart to display the top 10 OTUs (microbial species) found in all individuals. (Note that this chart will not be specific to the selected test subject)



Aggregate (sum) the sample_values across all individuals by OTU ID.


Use (aggregated) sample_values as the values for the bar chart.


Use <otu_id>: <genus> as the labels for the bar chart. The otu_labels are taxonomies that follow the taxonomic rank - Kingdom (or Domain in the case of Archaea); Phylum; Subphylum; Order; Family; Genus


Use otu_labels as the hovertext for the chart.




Create a bubble chart that displays the count of microbes by family for the test subject 940.



Note that family here is the family of the microbe and can be found by extracting the Kingdom (or Domain in the case of Archaea); Phylum; Subphylum; Order; Family portion of the otu_label and leaving out the Genus.
For eg. the label of the OTU ID 1 is Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus. Its family will be Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae


Aggregate (sum) the sample_values across the selected individual by family.


Use family for the y values.


Use (aggregated) sample_values for the x values.


Use (aggregated) sample_values for the marker size (area).


Use family for the text values.





Display the sample metadata, i.e., an individual's demographic information.


Display each key-value pair from the metadata JSON object somewhere on the page.




Update the bar chart and bubble chart specific to teh test subject every time a new test subject is selected using the dropdown provided.

Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:


Deployment
Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

About the Data
Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/