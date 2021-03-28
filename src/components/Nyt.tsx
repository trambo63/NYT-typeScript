import React from 'react';
import NytResults from './NytResults';
type SearchState = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: Array<string>;
}

export default class Nyt extends React.Component<{}, SearchState> {
    constructor(props: {}){
        super(props)
        this.state ={
            search: " ",
            startDate: " ",
            endDate: "",
            pageNumber: 0,
            results: [],
        }
    }
    fetchResults() {
        const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const key: string = 'ejwxyi9PgVpdwMH6M9AVoYt22sdlt7LD';   //set page number 
        let url: string = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
        if(this.state.startDate !== '') {
          url += '&begin_date=' + this.state.startDate;
        } else if (this.state.endDate !== ''){
            url += '&end_date=' + this.state.endDate;
        } else {
            fetch(url)
            .then(res => res.json())
            .then(json => this.setState({results: json.response.docs}))
        }
      
    } 

    handleSubmit(e: any){
        e.preventDefault();
        console.log(this.state.search);
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        this.fetchResults();
    }

    changePageNumber(e: any, direction: string){
        e.preventDefault();
        if(direction === 'down') {
          if(this.state.pageNumber > 0) {
            this.setState({pageNumber: - 1});
              this.fetchResults();
            }
          }
     
      if(direction === 'up') {
        this.setState({pageNumber: +1});
        this.fetchResults();
        }
      };
    
    componentDidMount(){
        console.log('mount')
    }

    componentDidUpdate() {
        console.log(this.state.results)
        console.log(this.state.pageNumber)
    }
    componentWillUnmount(){
        
    }

    render(){
        return(
               <div className="main">
               <div className="mainDiv">
                 <form onSubmit={(e) => this.handleSubmit(e)}>
                   <span>Enter a single search term (required) : </span>
                   <input type="text" name="search" onChange={(e) => this.setState({search: e.target.value})} required />
                   <br />
                   <span>Enter a start date: </span>
                   <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(e) => this.setState({startDate: e.target.value})} />
                   <br />
                   <span>Enter an end date: </span>
                   <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(e) => this.setState({endDate: e.target.value})} />
                   <br />
                   <button className="submit">Submit search</button>
                 </form>
                 <div>
                    <button onClick={(e) => this.changePageNumber(e, 'down')}>Previous 10</button>
                    <button onClick={(e) => this.changePageNumber(e, 'up')}>Next 10</button>
                </div> 
               {
                 this.state.results.length > 0 ? <NytResults results={ this.state.results } /> : null 
               }
               </div>
             </div>
        )
    }
}