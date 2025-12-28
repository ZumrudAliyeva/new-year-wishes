"use client";

import { useEffect, useState } from "react";

interface Props {
  userId: string;
  userName: string;
  onFinish: () => void;
}

export default function FortuneScene({ userId, userName, onFinish }: Props) {
  const [selectedFortunes, setSelectedFortunes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [closing, setClosing] = useState(false);


useEffect(() => {
  if (!sent) return;

  const resetTimer = setTimeout(() => {
    onFinish();
  }, 3000);

  return () => {
    clearTimeout(resetTimer);
  };
}, [sent, onFinish]);



useEffect(() => {
  if (selectedFortunes.length === 3 && !sent) {
    const t = setTimeout(() => setFormVisible(true), 800);
    return () => clearTimeout(t);
  }
}, [selectedFortunes, sent]);

  const handleFortuneClick = async () => {
    if (!userId || selectedFortunes.length >= 3) return;

    setIntroVisible(false);

    try {
      setLoading(true);
      const res = await fetch(`/api/users/${userId}/fortune`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usedFortunes: selectedFortunes }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Xəta baş verdi");

      setSelectedFortunes(prev => [...prev, data.fortune]);
    } catch {
      console.error("Fortune fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setSending(true);
      const res = await fetch(`/api/users/${userId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      console.error("Message send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`
    transition-all duration-800 ease-in-out
    ${closing ? "opacity-0 translate-y-4 blur-sm" : "opacity-100"}
  `}
>
      <p className={`
          w-3/4 max-w-[500px] absolute top-8 left-1/2 -translate-x-1/2
          bg-black/20 p-6 rounded-xl backdrop-blur-md text-center
          transition-opacity duration-700
          ${introVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}>
        Dilək dilə, hədiyyə torbasına toxun və yeni il üçün mesajını al. 3 dilək haqqın var.
      </p>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-8 w-1/2 items-end justify-end">
        <div className="relative w-[111px] md:w-[200px] xl:w-[333px]">
          <img
            src="/scene3/gift_sack.webp"
            alt="gift"
            className="w-[111px] md:w-[200px] xl:w-[333px]"
          />
          <button
            onClick={handleFortuneClick}
            disabled={loading || selectedFortunes.length >= 3}
            className="bg-transparent text-white/0 px-4 py-2 rounded w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
          >
            {loading ? "Gözlə..." : "toxun"}
          </button>
        </div>
      </div>
      <div className="w-3/4 max-w-[500px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
      {
        selectedFortunes.length > 0 && (

          <ul className="w-full bg-black/20 backdrop-blur-md rounded-xl p-6 text-sm">
        {selectedFortunes.map((f, i) => (
          <li key={i} className="mb-2">
            🎁 {f}
          </li>
        ))}
      </ul>
      )
    }

      {selectedFortunes.length === 3 && (
        <div className={`w-full bg-black/20 backdrop-blur-md rounded-xl p-6 mt-4 text-center
          transition-opacity duration-700
          ${formVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}>
          {!sent ? (
            <>
              <h3 className="">
                Zumrudə isə yeni il mesajını sən göndər 🎁
              </h3>
              <form onSubmit={handleSendMessage}>
              <textarea
                className="w-full mt-2 p-2 bg-black/10 backdrop-blur-md rounded focus:outline-none"
                placeholder="Mesajını yaz..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                {sending ? "Göndərilir..." : "Göndər"}
              </button>
              </form>
            </>
          ) : (
            <p className="mt-4 text-white">
              Təşəkkür edirəm, {userName}. Yeni il səni diləklərinlə qovuşdursun.✨
            </p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
