import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Yes from 'material-ui/svg-icons/navigation/check';
import No from 'material-ui/svg-icons/navigation/close';
import * as actions from '../actions';
import { Link } from 'react-router';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pageComponents: {
  	marginTop: 60,
  	display: 'inline-block',
  	verticalAlign: 'middle',
  },
  card: {
  	width: 400,
  	height: 600,
  	mediaStyle: {
  		width: 400,
  		height: 400,
  	},
  },
  button: {
  	marginLeft: 40,
  	marginRight: 40,
  },
};

class Cards extends Component {

	render() {
		return (
			<div style={style}>
				<div style={style.pageComponents}>
					<FloatingActionButton style={style.button} backgroundColor={'red'}>
			      <No />
			    </FloatingActionButton>
				</div>
				<div style={style.pageComponents}>
					<Card style={style.card}>
						<CardMedia mediaStyle={style.card.mediaStyle}>
				    	<img src={this.props.current.profile_url} />
		        </CardMedia>
		        <CardTitle title={this.props.current.name} subtitle={`${this.props.current.language} - ${this.props.current.skillLevel}`} />
		        <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
            <CardActions>
              <RaisedButton
                    label="Github Link"
                    linkButton={true}
                    href={`https://github.com/${this.props.current.github_handle}`}
                    secondary={true}
                    style={style.button}
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                  />
            </CardActions>
					</Card>
				</div>
				<div style={style.pageComponents}>
					<FloatingActionButton style={style.button} backgroundColor={'green'}>
			      <Yes />
			    </FloatingActionButton>
			  </div>
			</div>
			
		);
	}

}

function mapStateToProps(state) {
	return { current: state.cards.current, initiated: state.cards.initiated, uninitiated: state.cards.uninitiated };
}


export default connect(mapStateToProps, actions)(Cards);