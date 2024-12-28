"use client";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Formulaire from "@/components/Formulaire";
import CarteRecto from "@/components/CarteRecto";
import CarteVerso from "@/components/CarteVerso";
import { FaDownload, FaRedo, FaEye, FaEyeSlash } from "react-icons/fa"; // Importer des icônes depuis react-icons

export default function Home() {
  const [recipientName, setRecipientName] = useState("Nom du destinataire");
  const [giftDescription, setGiftDescription] = useState("Description ou valeur du cadeau");
  const [senderName, setSenderName] = useState("Nom de l'expéditeur");
  const [isValidated, setIsValidated] = useState(false);
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

  const { width, height } = useWindowSize();

  const resetForm = () => {
    setRecipientName("Nom du destinataire");
    setGiftDescription("Description ou valeur du cadeau");
    setSenderName("Nom de l'expéditeur");
    setIsValidated(false); // Revenir à l'état initial pour refaire le formulaire
    setActiveCard("recto"); // Réinitialiser la vue de la carte à recto par défaut
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-200 py-10 relative">
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
            <div
              ref={rectoRef}
              className={`card recto bg-white border rounded-lg shadow-lg ${
                activeCard === "recto" ? "block" : "hidden"
              }`}
              style={{ height: "auto", boxSizing: "border-box" }}
            >
              <CarteRecto recipientName={recipientName} />
            </div>

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
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            >
              <FaEye className="mr-2" /> Voir Recto
            </button>
            <button
              onClick={() => setActiveCard("verso")}
              className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
            >
              <FaEyeSlash className="mr-2" /> Voir Verso
            </button>

            <button
              onClick={() => downloadImage(rectoRef, "recto.png")}
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            >
              <FaDownload className="mr-2" /> Télécharger Recto
            </button>
            <button
              onClick={() => downloadImage(versoRef, "verso.png")}
              className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
            >
              <FaDownload className="mr-2" /> Télécharger Verso
            </button>
          </div>

          {/* Bouton pour réinitialiser */}
          <button
            onClick={resetForm} // Reset l'état du formulaire et les cartes
            className="m-2 p-2 bg-gray-500 hover:bg-gray-400 text-white rounded flex items-center"
          >
            <FaRedo className="mr-2" /> Générer un autre souhait !
          </button>

          {isValidated && width > 400 && height > 400 && (
            <Confetti width={width} height={height} />
          )}
        </>
      )}
    </div>
  );
}
