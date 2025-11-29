import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import { Settings, Globe, Bell, Volume2, VolumeX } from 'lucide-react-native';

export default function SettingsPanel() {
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const handleSaveSettings = () => {
    // Aquí guardarías la configuración
    alert('¡Configuración guardada!');
  };

  return (
    <View className="flex-1 bg-[#1A252F]">
      {/* Header */}
      <View className="bg-[#C4A784] px-6 py-8">
        <View className="flex-row items-center gap-4 mb-2">
          <View className="bg-white/20 p-3 rounded-lg">
            <Settings size={32} color="white" />
          </View>
          <Text className="text-4xl font-bold text-white">
            Configuración
          </Text>
        </View>
        <Text className="text-lg text-white/80 ml-16">
          Personaliza tu experiencia
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Idioma */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <Globe size={24} color="#C4A784" />
            <Text className="text-white text-lg font-bold">
              Idioma
            </Text>
          </View>

          <View className="gap-3">
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                className={`p-4 rounded-xl border-2 ${
                  language === lang.code
                    ? 'border-[#C4A784] bg-[#C4A784]/10'
                    : 'border-gray-700 bg-gray-900'
                }`}
                onPress={() => setLanguage(lang.code)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-2xl">{lang.flag}</Text>
                    <Text className={`text-base font-medium ${
                      language === lang.code ? 'text-[#C4A784]' : 'text-white'
                    }`}>
                      {lang.name}
                    </Text>
                  </View>
                  {language === lang.code && (
                    <View className="w-6 h-6 bg-[#C4A784] rounded-full items-center justify-center">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notificaciones */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <Bell size={24} color="#C4A784" />
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">
                  Notificaciones
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Recibe alertas sobre tus tareas
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#374151', true: '#C4A784' }}
              thumbColor={notifications ? '#fff' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Sonidos */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              {soundEnabled ? (
                <Volume2 size={24} color="#C4A784" />
              ) : (
                <VolumeX size={24} color="#C4A784" />
              )}
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">
                  Sonidos
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Efectos de sonido al completar tareas
                </Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#374151', true: '#C4A784' }}
              thumbColor={soundEnabled ? '#fff' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Información de la aplicación */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-4">
          <Text className="text-white text-lg font-bold mb-4">
            ℹ️ Información
          </Text>
          
          <View className="gap-3">
            <View className="flex-row justify-between items-center py-2 border-b border-gray-700">
              <Text className="text-gray-400">Versión</Text>
              <Text className="text-white font-medium">1.0.0</Text>
            </View>

            <View className="flex-row justify-between items-center py-2 border-b border-gray-700">
              <Text className="text-gray-400">Última actualización</Text>
              <Text className="text-white font-medium">Nov 2025</Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-400">Desarrollador</Text>
              <Text className="text-white font-medium">TaskMaster</Text>
            </View>
          </View>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity
          className="bg-[#C4A784] rounded-xl p-4 mb-3 items-center"
          onPress={handleSaveSettings}
        >
          <Text className="text-white font-bold text-base">
            💾 Guardar Configuración
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-800 rounded-xl p-4 mb-6 items-center border border-gray-700"
          onPress={() => alert('Configuración restaurada')}
        >
          <Text className="text-gray-400 font-bold text-base">
            🔄 Restaurar Valores por Defecto
          </Text>
        </TouchableOpacity>

        {/* Espacio inferior */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}