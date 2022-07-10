import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  AdaptivityProvider,
  ConfigProvider,
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Button,
  Checkbox,
  NativeSelect
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import MailList from "./components/MailList";

import available from './components/AvailableTheme.module.css';
import pets from './components/PetsTheme.module.css';

import './App.css';

const App = () => {
  const { viewWidth } = useAdaptivity();

  const [mails, setMails] = useState([]);
    
  const [selectedMails, setSelectedMails] = useState([]);

  const [appearance, setAppearance] = useState('light');

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [fetching, setFetching] = useState(true);
  
  useEffect(async () => {
    if (fetching) {
      const res = await fetch(`http://localhost:3030/api/mails/?limit=20&page=${currentPage}`, {
        method: 'GET'
      })
      const data = await res.json();

      setCurrentPage(prevState => prevState + 1);

      if (data.length) {
        setMails([...data]);

        setLastPage(currentPage);

        if (currentPage !== 1) window.scrollTo(0, 50);
      }
    }

    setFetching(false);
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function() {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight ) < 30) {
      setFetching(true);
    }
  }

  const setFirstPage = () => {
    if (lastPage > 1) {
      setCurrentPage(lastPage - 1);
      setFetching(true);
    }
  }

  const updateSelectedMails = (isChecked, idx) => {
    let array = mails;

    if (isChecked) {
      array[idx].checked = true;
    }

    setSelectedMails([...array]);
  }

  const setReadMails = async () => {
    let array = selectedMails;

    array.map(item => {
      if (item.checked === true) {
        item.read = true;
        item.checked = false;
      }
    })

    const res = await fetch('http://localhost:3030/api/mails/', {
      method: 'POST',
      body: JSON.stringify(array),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json();

    setMails([...array]);
  }

  const setUnreadMails = async () => {
    let array = selectedMails;

    array.map(item => {
      if (item.checked === true) {
        item.read = false;
        item.checked = false;
      }
    })

    const res = await fetch('http://localhost:3030/api/mails/', {
      method: 'POST',
      body: JSON.stringify(array),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json();

    setMails([...array]);
  }

  const changeCheckedAllMails = (isChecked) => {
    let array = mails;

    let checkboxes = document.getElementsByClassName('CellCheckbox__input');

    if (isChecked) {
      array.map(item => {
        item.checked = true;
      })
      
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
      }

    } else {
      array.map(item => {
        item.checked = false;
      })

      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    }

    setSelectedMails([...array]);

  }

  let [classes, setClasses] = useState('');

  useEffect(() => {
    if (appearance === 'pets') {
      setClasses(pets);
    } else {
      setClasses(available);
    }
  }, [appearance])

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={<PanelHeader separator={false} />}>
            <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
              <View activePanel="main">
                <Panel className={classes.mainPanel} id="main">
                  <PanelHeader className={appearance === 'available' ? classes.mainPanelHeader : ''}>
                    Mails
                  </PanelHeader>

                  <div className="main-panel__controls">
                    <Checkbox
                      className="main-panel__checkbox"
                      onChange={e => changeCheckedAllMails(e.target.checked)}>
                      Выделить все письма
                    </Checkbox>

                    <Button
                      className="main-panel__btn"
                      appearance={appearance === 'available' ? 'neutral' : 'accent'}
                      onClick={setReadMails}>
                      Отметить прочитанным
                    </Button>

                    <Button
                      className="main-panel__btn"
                      appearance={appearance === 'available' ? 'neutral' : 'accent'}
                      onClick={setUnreadMails}>
                      Отметить непрочитанным
                    </Button>

                    <NativeSelect onChange={e => setAppearance(e.target.value)}>
                      <option value="light">Светлая тема</option>
                      <option value="dark">Темная тема</option>
                      <option value="available">Доступная тема</option>
                      <option value="pets">Котики и собачки</option>
                    </NativeSelect>
                  </div>

                  <Button
                    className="main-panel__btn"
                    appearance={appearance === 'available' ? 'neutral' : 'accent'}
                    onClick={setFirstPage}>
                    Назад
                  </Button>

                  <MailList 
                    mails={mails}
                    updateSelectedMails={updateSelectedMails}
                    appearance={appearance}
                  />
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

export default App;
