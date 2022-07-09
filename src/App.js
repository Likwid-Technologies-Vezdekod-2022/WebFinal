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

import './App.css';

const App = () => {
  const { viewWidth } = useAdaptivity();

  const [mails, setMails] = useState([]);
    
  const [selectedMails, setSelectedMails] = useState([]);

  const [appearance, setAppearance] = useState('light');

  useEffect(async () => {
    const res = await fetch('http://localhost:3030/api/mails/', {
      method: 'GET'
    })
    const data = await res.json();
    setMails([...data]);
  }, [])

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

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={<PanelHeader separator={false} />}>
            <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
              <View activePanel="main">
                <Panel id="main">
                  <PanelHeader>
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
                      onClick={setReadMails}>
                      Отметить прочитанным
                    </Button>

                    <Button
                      className="main-panel__btn"
                      onClick={setUnreadMails}>
                      Отметить непрочитанным
                    </Button>

                    <NativeSelect onChange={e => setAppearance(e.target.value)}>
                      <option value="light">Светлая тема</option>
                      <option value="dark">Темная тема</option>
                    </NativeSelect>
                  </div>

                  <MailList 
                    mails={mails}
                    updateSelectedMails={updateSelectedMails}
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
