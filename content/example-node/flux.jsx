
var React = require('react/addons');

    var scoreOf = {};
    var scoreIs = function(point) {
        return function (letter) {
            scoreOf[letter] = point;
        };
    };
    var letters = ['Y','Z','Q','O','R','K','W','X','H','V','G','I','L','P','S','T','U','F','A','E','D','N','B','C','M','J'];
    ['A','E','I','L','N','O','R','S','T','U'].forEach(scoreIs(1));
    ['D','M','G'].forEach(scoreIs(2));
    ['B','C','P'].forEach(scoreIs(3));
    ['F','H','V'].forEach(scoreIs(4));
    ['J','Q'].forEach(scoreIs(8));
    ['K','W','X','Y','Z'].forEach(scoreIs(10));



    var Store = {
        callbacks : [],

        whenItemSelected : function (callback) {
            this.callbacks.push(callback);
        },

        handleSelectAction : function(options) {
            this.callbacks.forEach(function(callback) {
                callback(options.letter);
            });
        }
    };

    var Action = {
        select : function (item) {
            Store.handleSelectAction({letter : item})
        }
    };
            
    var Tree =  React.createClass({
        render : function () {
            return (<div>
                <Letters />
                <Score />
            </div>);
        },
    });

    var Letters = React.createClass({

        render : function () {

            return (<div>
                {letters.map(function(item) {
                    return <Letter itemValue={item} />;
                })}
            </div>);
        },

    });

    var Letter = React.createClass({

        render : function () {
            var classname = this.state.selected ? 'selected' : '';
            return (<div className={classname} onClick={this.handleClick}>{this.props.itemValue}</div>);
        },

        getInitialState : function () {
            return {selected : false };
        },

        componentDidMount : function() {
            var comp = this;
            Store.whenItemSelected(function(letter) {
                comp.setState({selected : letter ===  comp.props.itemValue});
            })
        },

        handleClick : function () {
            Action.select(this.props.itemValue);
        }
    });
              

    var Score = React.createClass({

        render : function () {
            return (<div>
                la lettre {this.state.letter} vaut {scoreOf[this.state.letter]} pts
            </div>);
        },

        getInitialState : function () {
            return {letter : '' };
        },

        componentDidMount : function() {
            var comp = this;
            Store.whenItemSelected(function(newletter) {
                comp.setState({letter : newletter});
            })
        },

    });


    //React.render(<Tree />, document.getElementById('root'));

module.exports.ReactClass = Tree;