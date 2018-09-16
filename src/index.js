import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetails from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyC2vJ0wSM9TeHAxedzk0DyUKIsHB2KKRT0';
// Create a new component. This component should producde some HTML



class App extends Component {
	constructor(props) {
		super(props);


		this.state = { 
			videos : [],
			selectedVideo: null 
		};

		
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos : videos,
				selectedVideo : videos[0]
			});
		});
	}
	render() {
		const videoSearch = _.debounce((term) => this.videoSearch(term), 300);

		return (
			<div>
				<SearchBar 
					onSearch = {videoSearch} />
				<VideoDetails video = {this.state.selectedVideo} />
				<VideoList 
				onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
				videos = {this.state.videos} />
			</div>
		);
	}
}



ReactDOM.render(<App />, document.querySelector('.container'));

