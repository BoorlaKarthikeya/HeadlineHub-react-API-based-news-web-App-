import React, { Component } from 'react'
import NewsItem from './NewsItem'
import propTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
    // articles = []
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Headline Hub `;

    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c394ebb1f52b489f87e61b096c579e70&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c394ebb1f52b489f87e61b096c579e70&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);

        let parseData = await data.json();
        this.props.setProgress(70);

        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c394ebb1f52b489f87e61b096c579e70&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c394ebb1f52b489f87e61b096c579e70&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("next");

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c394ebb1f52b489f87e61b096c579e70&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();
            console.log(parseData.articles);
            this.setState({
                articles: parseData.articles,
                loading: false,
                page: this.state.page + 1,
            })
        }
        console.log(this.state.page);

    }

    render() {
        return (
            <div className='container  text-center my-3'>
                {/* <h1>HeadlineHub - Top Headlines</h1> */}
                <h1 className="text-center" style={{ margin: '35px 90px', marginTop: "8rem" }}> HeadlineHub - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {/* <div className='row'> */}
                {this.state.loading && <Spinner />}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
                    <div className="container" >

                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-lg-4 col-md-6" key={element.url} >
                                    <NewsItem title={element.title ? element.title : ""} date={element.publishedAt} source={element.source.name} author={element.author} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/free-vector/breaking-news-concept_23-2148514216.jpg?w=2000"} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll >
                {/* {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-lg-4 col-md-6" key={element.url} >
                            <NewsItem title={element.title ? element.title : ""} date={element.publishedAt} source={element.source.name} author={element.author} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/free-vector/breaking-news-concept_23-2148514216.jpg?w=2000"} newsUrl={element.url} />
                        </div>

                    })} */}
                {/* </div> */}

                {/* <div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type='button' className='btn btn-dark'> &larr; Previous</button>
                        <button onClick={this.handleNextClick} type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark'>Next &rarr; </button>

                    </div>
                </div> */}
            </div >
        );
    }
}
export default News;