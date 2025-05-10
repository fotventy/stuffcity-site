"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus({
        type: "error",
        message: "Пожалуйста, введите корректный email",
      });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
    
    // В реальном приложении здесь был бы запрос к API
    try {
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({
        type: "success",
        message: "Спасибо за подписку! Вскоре вы получите наши новости.",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Произошла ошибка. Пожалуйста, попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-950/30 to-black p-6 sm:p-8 rounded-lg shadow-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-4">Подпишитесь на новости</h3>
      <p className="text-sm sm:text-base text-orange-100/80 mb-6">
        Получайте актуальную информацию о наших услугах, спецпредложениях и полезные материалы для вашего бизнеса.
      </p>
      
      {status.type && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            status.type === "success"
              ? "bg-green-500/20 text-green-200"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          className="flex-1 px-4 py-2 rounded bg-black/50 border border-orange-500/30 text-white placeholder:text-orange-100/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={`bg-orange-500 text-black font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Подписка...
            </>
          ) : (
            "Подписаться"
          )}
        </button>
      </form>
      <p className="text-xs text-orange-100/60 mt-3">
        Нажимая кнопку "Подписаться", вы соглашаетесь с нашей политикой конфиденциальности и даете согласие на обработку персональных данных.
      </p>
    </div>
  );
} 