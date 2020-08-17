// use D3 to create an event handler
d3.select('#selDataset').on('change', updatePage);

function updatePage(){
    // prevent the page from refreshing
    d3.event.preventDefault();
    // use D3 to select the dropdown menu
    const dropdownMenu = d3.select('#selDataset');
    // Assign the value of the dropdown menu option to a variable
    const dataset = dropdownMenu.property('value');
}

function buildPlot(subject){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;
        console.log(data);

    // Grab the values from the response json object to build the plot
    const testSubject940 = data.samples[0];
    const sampleValues = testSubject940.sample_values;
    const otuIDs = testSubject940.otu_ids;
    const otuLabels = testSubject940.otu_labels;

    // combine the otuIDs with the otuLabels
    let joinedIDs = [];
    otuIDs.forEach((item, index) => {joinedIDs.push(`${item}-${otuLabels[index].split(";")[5]}`)});

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
buildPlot();

// TODO:
// insert options in the dropdown menu using the ids from the json response
// add a list with the demographic info for the subject selected
// use filter to select information only for the selected test subject
    // testSubject = data.samples.filter(subject => subject.id == input)
// create a plot for the top 10 bacteria among all subjects
    // define an unpack function
    // select all samples and unpack entris by index
    // then apply a similar algorithm as for bar1

function buildSecondPlot(){
    // Use D3 fetch to read the json file
    d3.json("data/samples.json").then((importedData) => {
        const data = importedData;
        const samples = data.samples;
        
        const values = samples.map(subject => subject.sample_values);
        const ids = samples.map(subject => subject.otu_ids);
        const labels = samples.map(subject => subject.otu_labels);

        console.log(values);
        // console.log(ids);
        // console.log(labels);

        // combine the otuIDs with the otuLabels
        let joinIDsAndLabels = [];
        ids.forEach((subject, info) => {
            subject.forEach((item,index)=>{
                joinIDsAndLabels.push(`${item}-${labels[info][index].split(";")[5]}`)});
        })
        console.log(joinIDsAndLabels);
        
        // join all value arrays into one
        let valueArr = [];
        values.forEach(subject => {
            subject.forEach(element => valueArr.push(element));
        });
        console.log(valueArr);

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
}
buildSecondPlot();