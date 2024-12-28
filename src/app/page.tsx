"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Formulaire from "@/components/Formulaire";
import CarteRecto from "@/components/CarteRecto";
import CarteVerso from "@/components/CarteVerso";

export default function Home() {
  const [recipientName, setRecipientName] = useState<string>(
    "Nom du destinataire"
  );
  const [giftDescription, setGiftDescription] = useState<string>(
    "Description ou valeur du cadeau"
  );
  const [senderName, setSenderName] = useState<string>("Nom de l'expéditeur");
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<"recto" | "verso">("recto");

  const rectoRef = useRef<HTMLDivElement>(null);
  const versoRef = useRef<HTMLDivElement>(null);

  const downloadImage = (
    cardRef: React.RefObject<HTMLDivElement | null>,
    filename: string
  ) => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageData;
        link.download = filename;
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-200 py-10 relative">
      {/* Animation des feux d'artifice */}
      {isValidated && (
        <div className="absolute inset-0 bg-transparent pointer-events-none">
          <div className="fireworks animation fireworks bg-transparent absolute inset-0 z-50" />
        </div>
      )}

      {!isValidated ? (
        <Formulaire
          recipientName={recipientName}
          giftDescription={giftDescription}
          senderName={senderName}
          setRecipientName={setRecipientName}
          setGiftDescription={setGiftDescription}
          setSenderName={setSenderName}
          onValidate={() => setIsValidated(true)}
          initialRecipientName="wishmaker"
          initialGiftDescription="joyeuses fêtes"
          initialSenderName="simdev"
        />
      ) : (
        <>
          <div className="w-full flex justify-center">
            {/* Card Recto */}
            <div
              ref={rectoRef}
              className={`card recto bg-white border rounded-lg shadow-lg ${
                activeCard === "recto" ? "block" : "hidden"
              }`}
              style={{ height: "auto", boxSizing: "border-box" }}
            >
              <CarteRecto recipientName={recipientName} />
            </div>

            {/* Card Verso */}
            <div
              ref={versoRef}
              className={`card verso bg-white border rounded-lg shadow-lg ${
                activeCard === "verso" ? "block" : "hidden"
              }`}
              style={{ height: "auto", boxSizing: "border-box" }}
            >
              <CarteVerso
                recipientName={recipientName}
                giftDescription={giftDescription}
                senderName={senderName}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            <button
              onClick={() => setActiveCard("recto")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Voir Recto
            </button>
            <button
              onClick={() => setActiveCard("verso")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Voir Verso
            </button>

            {/* Boutons pour télécharger les cartes sans passer par l'aperçu */}
            <button
              onClick={() => downloadImage(rectoRef, "recto.png")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Télécharger Recto
            </button>
            <button
              onClick={() => downloadImage(versoRef, "verso.png")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Télécharger Verso
            </button>
          </div>
        </>
      )}
    </div>
  );
}
