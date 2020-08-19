// read the json file using D3 fetch
d3.json("data/samples.json").then((importedData) => {
    const data = importedData;
    console.log(data);

    // grab all the ids from the json object
    const subjectID = data.samples.map(subject => subject.id);

    // get a handle on the html tag with the dropdown menu
    const menu = d3.select('#selDataset');

    // insert the ids as options in the dropdown menu
    subjectID.forEach(subject => {
            const option = menu.append('option');
            option.text(`${subject}`);
        });
});

// define the initial aspect of the page
function init(){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;
    
    // Demographic info
    const metadata = data.metadata.filter(subjectID => subjectID.id == '940');    
    const info = Object.entries(metadata[0]); // extract the key:value pairs from the metadata
    const reformatedInfo = info.map(entry => entry.join(': ')); // reformat the info
    const panel = d3.select('#sample-metadata').append('ul'); // create a list to host subject's data

        // append demographic info to metadata panel
        reformatedInfo.forEach(item => {
            let x = panel.append('li');
            x.text(`${item}`);
        })

    // bar chart
    const testSubject = data.samples.filter(sample => sample.id == '940');
    const sampleValues = testSubject[0].sample_values;
    const otuIDs = testSubject[0].otu_ids;
    const otuLabels = testSubject[0].otu_labels; 
    
    const joinedIDs = []; // combine the otuIDs with the otuLabels
    otuIDs.forEach((item, index) => {joinedIDs.push(`${item}: ${otuLabels[index]}`)});

    const result = {}; // create an object with the IDs and sample values
    joinedIDs.forEach((key, i) => result[key] = sampleValues[i]);

    const entries = Object.entries(result); // create an array of the object entries
    const sorted = entries.sort((a,z)=>z[1]-a[1]); // sort the entries by value in descending order
    const sliced = sorted.slice(0,10); // slice the top ten results
    const reversed = sliced.reverse(); // reverse the order for the plot

    const x = reversed.map(item => item[1]); // define x and y coordinates for the bar plot
    const yFirstPart = reversed.map(item => item[0].split(":").slice(0,1));
    const ySecondPart = reversed.map(item => item[0].split(":").pop().split(";").pop());
    const y = [];
    for (let i = 0; i < yFirstPart.length; i++){
        y.push(`${yFirstPart[i]}: ${ySecondPart[i]}`)
    }

        // create a trace object
        const trace = {
            type: 'bar',
            x: x,
            y: y,
            orientation: 'h',
            text: reversed.map(item => item[0].split(':').pop())
        };
        // define the layout for the bar plot
        const layout = {
            title: 'Top 10 Bacteria - Selected Subject',
            yaxis: {
                automargin: true
            }
        };
        // create the bar plot
        Plotly.newPlot('bar1',[trace],layout);
        })
}
init();

// handle events associated with selections in the dropdown menu
function optionChanged(){
    // use D3 to select the dropdown menu
    const dropdownMenu = d3.select('#selDataset');

    // Assign the value of the dropdown menu option to a variable
    const subject = dropdownMenu.property('value');

    // build a plot with the new subject
    buildPlot(subject);
}

// build a horizontal bar chart with data from the selected subject
function buildPlot(subject){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;

    // demographic info panel
    const metadata = data.metadata.filter(subjectID => subjectID.id == subject); 
    const info = Object.entries(metadata[0]); // extract the key:value pairs from the metadata
    const reformatedInfo = info.map(entry => entry.join(': ')); // reformat the info  
    d3.select('#sample-metadata>ul').remove(); // clear existing list
    const panel = d3.select('#sample-metadata').append('ul'); // create a list to host subject's data

        // append demographic info to metadata panel
        reformatedInfo.forEach(item => {
            let x = panel.append('li');
            x.text(`${item}`);
        })

    // bar chart
    const testSubject = data.samples.filter(sample => sample.id == subject);
    console.log(testSubject);
    const sampleValues = testSubject[0].sample_values;
    const otuIDs = testSubject[0].otu_ids;
    const otuLabels = testSubject[0].otu_labels;
    
    const joinedIDs = []; // combine the otuIDs with the otuLabels
    otuIDs.forEach((item, index) => {joinedIDs.push(`${item}: ${otuLabels[index]}`)});

    const result = {}; // create an object with the IDs and sample values
    joinedIDs.forEach((key, i) => result[key] = sampleValues[i]);
    const entries = Object.entries(result); // create an array of the object entries    
    const sorted = entries.sort((a,z)=>z[1]-a[1]); // sort the entries by value in descending order
    const sliced = sorted.slice(0,10); // slice the top ten results
    const reversed = sliced.reverse(); // reverse the order for the plot

    
    const x = reversed.map(item => item[1]); // define x and y coordinates for the bar plot
    const yFirstPart = reversed.map(item => item[0].split(":").slice(0,1));
    const ySecondPart = reversed.map(item => item[0].split(":").pop().split(";").pop());
    const y = [];
    for (let i = 0; i < yFirstPart.length; i++){
        y.push(`${yFirstPart[i]}: ${ySecondPart[i]}`)
    }

        // create a trace object
        const trace = {
            type: 'bar',
            x: x,
            y: y,
            orientation: 'h',
            text: reversed.map(item => item[0].split(":").pop())
        };
        // define the layout for the bar plot
        const layout = {
            title: 'Top 10 Bacteria - Selected Subject',
            yaxis: {
                automargin: true
            }
        };
        // create the bar plot
        Plotly.newPlot('bar1',[trace],layout);
        })
};

// generate a plot including all subjects in the dataset
// Use D3 fetch to read the json file
d3.json("data/samples.json").then((importedData) => {
    const data = importedData;
    const samples = data.samples;
    const values = samples.map(subject => subject.sample_values);
    const ids = samples.map(subject => subject.otu_ids);
    const labels = samples.map(subject => subject.otu_labels);

    // combine the otuIDs with the otuLabels
    let joinIDsAndLabels = [];
    ids.forEach((subject, info) => {
        subject.forEach((item,index)=>{
            joinIDsAndLabels.push(`${item}: ${labels[info][index]}`)});
    })

    // join all value arrays into one
    valueArr = values.flat();

    // create an object with the IDs and sample values aggregated as sum
    let result = {};
    joinIDsAndLabels.forEach((key, i) => {if (!(key in result)){
        result[key] = valueArr[i]; }
        else{
            result[key] += valueArr[i];
        }
    });
    console.log(result);

    // create an array of the object entries
    let entries = Object.entries(result);

    // sort the entries by value in descending order
    let sorted = entries.sort((a,z)=>z[1]-a[1]);

    // slice the top ten results
    let sliced = sorted.slice(0,10);

    // reverse the order for the plot
    let reversed = sliced.reverse();

    // define x and y coordinates for the bar plot
    let x = reversed.map(item => item[1]);
    const yFirstPart = reversed.map(item => item[0].split(":").slice(0,1));
    const ySecondPart = reversed.map(item => item[0].split(":").pop().split(";").pop());
    const y = [];
    for (let i = 0; i < yFirstPart.length; i++){
        y.push(`${yFirstPart[i]}: ${ySecondPart[i]}`)
    }

    // create a trace object
    const trace = {
        type: 'bar',
        x: x,
        y: y,
        orientation: 'h',
        text: reversed.map(item => item[0].split(":").pop())
    };
    // define the layout for the bar plot
    const layout = {
        title: 'Top 10 Bacteria - All Subjects',
        yaxis: {
            automargin: true
        }
    };
    // create the bar plot
    Plotly.newPlot('bar2',[trace],layout);
});    

// TODO:
// add full otu_labels as hover text to the chart for all subjects
// make sure to get the labels that correspond with each id
// create bubble plot
// link bubble chart to drowpdown menu
// add the bubble chart to the init function
// check the genus for each sample
// check the labels for the bar charts