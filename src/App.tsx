import PoolReportForm from "./PoolReportForm";
import "./App.css";

function App() {
  const handleSuccess = () => {
    console.log("✅ 수영장 정보 제보 성공!");
    // 성공 후 추가 동작이 필요하면 여기에 작성
  };

  const handleError = (error: Error) => {
    console.error("❌ 수영장 정보 제보 실패:", error);
    // 에러 처리 로직이 필요하면 여기에 작성
  };

  return (
    <div className="App">
      <PoolReportForm onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default App;
