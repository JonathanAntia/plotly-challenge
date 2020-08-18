// read the json file using D3 fetch
d3.json("data/samples.json").then((importedData) => {
    const data = importedData;
    console.log(data);

    // grab all the ids from the json object
    const subjectID = data.samples.map(subject => subject.id);
    console.log(subjectID);

    // get a handle on the html tag with the dropdown menu
    const menu = d3.select('#selDataset');

    // insert the ids as options in the dropdown menu
    subjectID.forEach(subject => {
            let option = menu.append('option');
            option.text(`${subject}`);
        });
});

// init function defines the initial aspect of the page
function init(){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;
    
    // Grab the metadata to add to the demographic info panel
    const metadata = data.metadata.filter(subjectID => subjectID.id == '940');    

    // extract the key:value pairs from the metadata
    const info = Object.entries(metadata[0]);

    // reformat the info
    const reformatedInfo = info.map(entry => entry.join(': '));

    // get a handle on the html tag for the sample metadata and add a list tag
    const panel = d3.select('#sample-metadata').append('ul');

    // append demographic info to metadata panel
    reformatedInfo.forEach(item => {
        let x = panel.append('li');
        x.text(`${item}`);
    })

    // Grab the values from the response json object to build the plot
    const testSubject = data.samples.filter(sample => sample.id == '940');
    console.log(testSubject);
    const sampleValues = testSubject[0].sample_values;
    const otuIDs = testSubject[0].otu_ids;
    const otuLabels = testSubject[0].otu_labels;
 
    // combine the otuIDs with the otuLabels
    let joinedIDs = [];
    otuIDs.forEach((item, index) => {joinedIDs.push(`${item}-${otuLabels[index].split(";").pop()}`)});

    // create an object with the IDs and sample values
    let result = {};
    joinedIDs.forEach((key, i) => result[key] = sampleValues[i]);

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
    let y = reversed.map(item => item[0]);

    // create a trace object
    const trace = {
        type: 'bar',
        x: x,
        y: y,
        orientation: 'h',
        margin:{
            l: 200,
            r: 200,
            t: 100,
            b: 100
        }
    };
    // define the layout for the bar plot
    const layout = {
        title: 'Top 10 Bacteria - Selected Subject'
    };
    // create the bar plot
    Plotly.newPlot('bar1',[trace],layout);
    })
}
init();

// the optionChanged function is an event handler
function optionChanged(){
    // use D3 to select the dropdown menu
    const dropdownMenu = d3.select('#selDataset');

    // Assign the value of the dropdown menu option to a variable
    const subject = dropdownMenu.property('value');

    // build a plot with the new subject
    buildPlot(subject);
}

// the buildPlot function creates a horizontal bar plot for the selected subject
function buildPlot(subject){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;

    // Grab the metadata to add to the demographic info panel
    const metadata = data.metadata.filter(subjectID => subjectID.id == subject);    

    // extract the key:value pairs from the metadata
    const info = Object.entries(metadata[0]);

    // reformat the info
    const reformatedInfo = info.map(entry => entry.join(': '));

    // clear existing list
    d3.select('#sample-metadata>ul').remove();

    // get a handle on the html tag for the sample metadata and add a list tag
    const panel = d3.select('#sample-metadata').append('ul');

    // append demographic info to metadata panel
    reformatedInfo.forEach(item => {
        let x = panel.append('li');
        x.text(`${item}`);
    })
    // Grab the values from the response json object to build the plot
    const testSubject = data.samples.filter(sample => sample.id == subject);
    console.log(testSubject);
    const sampleValues = testSubject[0].sample_values;
    const otuIDs = testSubject[0].otu_ids;
    const otuLabels = testSubject[0].otu_labels;
 
    // combine the otuIDs with the otuLabels
    let joinedIDs = [];
    otuIDs.forEach((item, index) => {joinedIDs.push(`${item}-${otuLabels[index].split(";").pop()}`)});

    // create an object with the IDs and sample values
    let result = {};
    joinedIDs.forEach((key, i) => result[key] = sampleValues[i]);

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
    let y = reversed.map(item => item[0]);

    // create a trace object
    const trace = {
        type: 'bar',
        x: x,
        y: y,
        orientation: 'h',
        margin:{
            l: 200,
            r: 200,
            t: 100,
            b: 100
        }
    };
    // define the layout for the bar plot
    const layout = {
        title: 'Top 10 Bacteria - Selected Subject'
    };
    // create the bar plot
    Plotly.newPlot('bar1',[trace],layout);
    })
};
// TODO:
// revise the all subjects plot to aggregate the data

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
            joinIDsAndLabels.push(`${item}-${labels[info][index].split(";").pop()}`)});
    })
    
    // join all value arrays into one
    valueArr = values.flat();

    // create an object with the IDs and sample values
    let result = {};
    joinIDsAndLabels.forEach((key, i) => result[key] = valueArr[i]);

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
    let y = reversed.map(item => item[0]);

    // create a trace object
    const trace = {
        type: 'bar',
        x: x,
        y: y,
        orientation: 'h',
        margin:{
            l: 200,
            r: 200,
            t: 100,
            b: 100
        }
    };
    // define the layout for the bar plot
    const layout = {
        title: 'Top 10 Bacteria - All Subjects'
    };
    // create the bar plot
    Plotly.newPlot('bar2',[trace],layout);
});    
