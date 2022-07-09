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
  Checkbox
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import MailList from "./components/MailList";

import './App.css';

const App = () => {
  const { viewWidth } = useAdaptivity();

  const [mails, setMails] = useState([]);
    
  const [selectedMails, setSelectedMails] = useState([]);

  useEffect(async () => {
    const res = await fetch('http://localhost:3030/api/mails/', {
      method: 'GET'
    })
    const data = await res.json();
    setMails([...data]);
  })

  const updateSelectedMails = (isChecked, idx) => {
    let array = mails;

    if (isChecked) {
      array[idx].checked = true;
    }

    setSelectedMails(array);
  }

  const setReadMails = () => {
    let array = selectedMails;

    array.map(item => {
      if (item.checked === true) {
        item.read = true;
        item.checked = false;
      }
    })

    setMails([...array]);

    console.log(mails)
  }

  const setUnreadMails = () => {
    let array = selectedMails;

    array.map(item => {
      if (item.checked === true) {
        item.read = false;
        item.checked = false;
      }
    })

    setMails([...array]);
    console.log(mails)
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
  );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

export default App;
