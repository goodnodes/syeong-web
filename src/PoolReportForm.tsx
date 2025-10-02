import { useEffect, useState } from "react";
import { API_BASE_URL, MAX_POOL_NAME_LENGTH } from "./constants/config";
import { useToastNotification } from "./components/Toast";
import { TextField } from "./components/ui/TextField";
import { TextArea } from "./components/ui/TextArea";
import { Button } from "./components/ui/Button";
import { Header } from "./components/ui/Header";
import { SectionDivider } from "./components/ui/SectionDivider";
import { SectionTitle } from "./components/ui/SectionTitle";
import Lottie from "lottie-react";
import animationData from "./assets/file_search_lottie.json";

interface PoolReportFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function PoolReportForm({ onSuccess, onError }: PoolReportFormProps) {
  const { showToast, ToastComponent } = useToastNotification();
  const [isLoading, setIsLoading] = useState(false);

  // 수영장 정보 상태들
  const [poolName, setPoolName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [laneCount, setLaneCount] = useState<string>("");
  const [laneLength, setLaneLength] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleReportPoolInfo() {
    if (!isFormValid) {
      showToast("수영장 이름을 입력해주세요", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/pool/sheet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "",
          name: poolName,
          url: websiteUrl || "",
          address: address || "",
          pnum: phoneNumber || "",
          lanelength: laneLength || "",
          lanenum: laneCount || "",
          costinfo: "",
          reeswim: "",
          imgurl: "",
          outsideimgurl: "",
          city: "",
          region: "",
          status: "",
          type: "신규",
          poolName: poolName,
          detailAddress: detailAddress || "",
          additionalInfo: additionalInfo || "",
        }),
      });
      setIsLoading(false);

      if (res.status !== 201) {
        const error = new Error("수영장 정보 제보에 실패했어요");
        showToast("수영장 정보 제보에 실패했어요", "error");
        onError?.(error);
      } else {
        showToast("수영장 정보를 제보했어요", "success");

        // 폼 초기화
        setPoolName("");
        setPhoneNumber("");
        setWebsiteUrl("");
        setLaneCount("");
        setLaneLength("");
        setAddress("");
        setDetailAddress("");
        setAdditionalInfo("");

        onSuccess?.();
      }
    } catch (e) {
      setIsLoading(false);
      console.error(`제보 실패: ${e}`);
      const error = e instanceof Error ? e : new Error("수영장 정보 제보에 실패했어요");
      showToast("수영장 정보 제보에 실패했어요", "error");
      onError?.(error);
    }
  }

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const errorMaxPoolNameLengthMessage = `${MAX_POOL_NAME_LENGTH}자 미만으로 입력해주세요.`;
  const errorMinPoolNameLengthMessage = "수영장 이름은 필수 항목이에요.";

  const handleMaxPoolNameLengthError = (value: string) => {
    return value.length >= MAX_POOL_NAME_LENGTH;
  };

  const handleMinPoolNameLengthError = (value: string) => {
    return value.trim().length <= 0;
  };

  const isFormValid = !handleMinPoolNameLengthError(poolName) && !handleMaxPoolNameLengthError(poolName);

  return (
    <>
      {ToastComponent}
      <div className="min-h-screen bg-white pb-24">
        {/* Header with Icon */}
        <Header
          icon={
            <div className="w-[120px] h-[120px] r from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
              <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
              />
            </div>

          }
          title="수영장 정보 제보하기"
          subtitle="셩에 없는 수영장이 있거나 정보가 실제랑 조금 다르다면 알려주세요!
확인해서 빠르게 업데이트할게요"
        />

        <SectionDivider />

        <SectionTitle>추가 혹은 수정이 필요한 수영장 정보</SectionTitle>

        {/* Form Fields */}
        <div className="px-6 space-y-4">
          {/* 수영장 이름 (필수) */}
          <TextField
            label="* (필수) 수영장 이름"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            onClear={() => setPoolName("")}
            placeholder="수영장 이름을 적어주세요"
            hasError={handleMaxPoolNameLengthError(poolName)}
            help={
              handleMinPoolNameLengthError(poolName)
                ? errorMinPoolNameLengthMessage
                : handleMaxPoolNameLengthError(poolName)
                  ? errorMaxPoolNameLengthMessage
                  : null
            }
          />

          {/* 전화번호 (선택) */}
          <TextField
            label="전화번호"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onClear={() => setPhoneNumber("")}
            placeholder="010-0000-0000"
            inputMode="numeric"
          />

          {/* 수영장 주소 */}
          <TextField
            label="수영장 주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onClear={() => setAddress("")}
            placeholder="수영장 주소를 입력해주세요"
          />

          {/* 상세 주소 */}
          <TextField
            label="상세 주소"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            onClear={() => setDetailAddress("")}
            placeholder="(예: 셩 빌딩 7층 / A동 201호)"
          />

          {/* 웹사이트 URL (선택) */}
          <TextField
            label="수영장 정보 링크"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            onClear={() => setWebsiteUrl("")}
            placeholder="홈페이지 또는 강습정보 URL을 적어주세요"
            inputMode="url"
          />

          {/* 레인 갯수 (선택) */}
          <TextField
            label="레인 갯수"
            value={laneCount}
            onChange={(e) => setLaneCount(e.target.value)}
            onClear={() => setLaneCount("")}
            placeholder="수영장 레인 갯수를 적어주세요"
            inputMode="numeric"
          />

          {/* 레인 길이 (선택) */}
          <TextField
            label="레인 길이 (m)"
            value={laneLength}
            onChange={(e) => setLaneLength(e.target.value)}
            onClear={() => setLaneLength("")}
            placeholder="수영장 레인 길이를 적어주세요"
            inputMode="numeric"
          />

          {/* 추가 정보 (선택) */}
          <TextArea
            label="추가 정보"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="그 외 수영장 정보를 자유롭게 적어주세요
(수영장 이미지 링크, 주차 가능 여부 등)"
            minHeight="120px"
          />
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray_1">
          <div className="max-w-screen-md mx-auto">
            <Button
              onClick={handleReportPoolInfo}
              disabled={!isFormValid}
              loading={isLoading}
              fullWidth
            >
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
