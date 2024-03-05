const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;


class App extends React.Component {
  title = (
    <div style={{padding: '10px'}}>
      <b>Work 6 : Firebase</b> 
    </div>
  );
  footer = (
    <div>
      By  643021342-5 สุพัตรา แพงจันทร์ CS <br />
      College of Computing, Khon Kaen University
    </div>
  );

  state = {
    scene: 0,
    students: [],
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    stdphone: "",
  }

  insertData() {
    db.collection("students").doc(this.state.stdid).set({
      title: this.state.stdtitle,
      fname: this.state.stdfname,
      lname: this.state.stdlname,
      phone: this.state.stdphone,
      email: this.state.stdemail,
    });
  }

  edit(std) {
    this.setState({
      stdid: std.id,
      stdtitle: std.title,
      stdfname: std.fname,
      stdlname: std.lname,
      stdemail: std.email,
      stdphone: std.phone,
    })
  }

  delete(std) {
    if (confirm("ต้องการลบข้อมูล")) {
      db.collection("students").doc(std.id).delete();
    }
  }


  render() {
    return (
      <Card>
        <Card.Header>{this.title}</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={() => this.readData()} style={{ width: 120, marginRight: '10px' }}>Read Data</Button>
          <Button variant="secondary" onClick={() => this.autoRead()}>Auto Read</Button>
          <div className="mt-3">
            <StudentTable data={this.state.students} app={this} />
          </div>
        </Card.Body>
        <Card.Footer>
          <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
          <TextInput label="รหัส" app={this} value="stdid" style={{ width: 200, marginRight: '10px' }} />
          <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 120, marginRight: '10px' }} />
          <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 220, marginRight: '10px' }} />
          <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 220, marginRight: '10px' }} />
          <TextInput label="Email" app={this} value="stdemail" style={{ width: 200, marginRight: '10px' }} />
          <TextInput label="Phone" app={this} value="stdphone" style={{ width: 150, marginRight: '10px' }} />
          <Button onClick={() => this.insertData()} style={{backgroundColor:"#00BF63" ,color:"#ffffff"}}>Save</Button>
        </Card.Footer>

        <Card.Footer>{this.footer}</Card.Footer>
      </Card>
    );
  }


  readData() {
    db.collection("students").get().then((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      console.log(stdlist);
      this.setState({ students: stdlist });
    });
  }

  autoRead() {
    db.collection("students").onSnapshot((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ students: stdlist });
    });
  }

}

function StudentTable({ data, app }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>รหัส</th>
          <th>คำนำหน้า</th>
          <th>ชื่อ</th>
          <th>สกุล</th>
          <th>email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.title}</td>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>{s.email}</td>
            <td><EditButton std={s} app={app} /></td>
            <td><DeleteButton std={s} app={app} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function TextInput({ label, app, value, style }) {
  return (
    <label className="form-label">
      {label}
      <input className="form-control" style={style}
        value={app.state[value]} onChange={(ev) => {
          var s = {};
          s[value] = ev.target.value;
          app.setState(s)
        }
        }></input>
    </label>
  );
}

function EditButton({ std, app }) {
  return (
    <button className="btn " style={{backgroundColor:"#00BF63" ,color:"#ffffff"}} onClick={() => app.edit(std)}>แก้ไข</button>
  );
}

function DeleteButton({ std, app }) {
  return (
    <button className="btn btn-danger" onClick={() => app.delete(std)}>ลบ</button>
  );
}

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);

const firebaseConfig = {
  apiKey: "AIzaSyCe8AI4Vhw89dtCl8p3bg0Swfw8SQuKOL4",
  authDomain: "web2566-cc2e0.firebaseapp.com",
  projectId: "web2566-cc2e0",
  storageBucket: "web2566-cc2e0.appspot.com",
  messagingSenderId: "248996915912",
  appId: "1:248996915912:web:420b6a506b63f1823c13fd",
  measurementId: "G-8W9S7GNTRJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} =>`, doc.data());
//   });
// });
