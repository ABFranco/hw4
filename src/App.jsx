import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1,
    })));
  }

  clearCompletedItems() {
    // TODO 7
    let uncompleted = this.state.items.filter(item => !item.isCompleted);
    this.setState({items: uncompleted, areItemsMarkedAsCompleted: false})
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    for (let item of this.state.items) {
      if (item.id == itemId) {
        item.sessionsCompleted = item.sessionsCompleted + 1;
      }
    }
    this.setState({items: this.state.items})

  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    for (let item of this.state.items) {
      if (item.id == itemId) {
        if (item.isCompleted) {
          item.isCompleted = false;
        } else {
          item.isCompleted = true;
          this.setState({areItemsMarkedAsCompleted: true});
        }
      }
    }
    this.setState({items: this.state.items})
  }

  startSession(id) {
    // TODO 4
    this.setState({itemIdRunning: id, sessionIsRunning: true});
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {this.state.items.length == 0 && (
            <EmptyState />
          )}
          {/* TODO 4 */
             sessionIsRunning && this.state.items.length > 0 && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning) }
              autoPlays
              key={itemIdRunning}
            /> 
          }
            
            <div className="items-container">
            {/* TODO 3:  display todo items */
            this.state.items.map((item) =>
              <TodoItem 
                key={item.id}
                description={item.description}
                sessionsCompleted={item.sessionsCompleted}
                isCompleted={item.isCompleted}
                startSession={() => this.startSession(item.id)}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              />
          )}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
