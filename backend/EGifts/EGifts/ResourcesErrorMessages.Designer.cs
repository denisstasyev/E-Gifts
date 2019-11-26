﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан программой.
//     Исполняемая версия:4.0.30319.42000
//
//     Изменения в этом файле могут привести к неправильной работе и будут потеряны в случае
//     повторной генерации кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EGifts {
    using System;
    
    
    /// <summary>
    ///   Класс ресурса со строгой типизацией для поиска локализованных строк и т.д.
    /// </summary>
    // Этот класс создан автоматически классом StronglyTypedResourceBuilder
    // с помощью такого средства, как ResGen или Visual Studio.
    // Чтобы добавить или удалить член, измените файл .ResX и снова запустите ResGen
    // с параметром /str или перестройте свой проект VS.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class ResourcesErrorMessages {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal ResourcesErrorMessages() {
        }
        
        /// <summary>
        ///   Возвращает кэшированный экземпляр ResourceManager, использованный этим классом.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("EGifts.ResourcesErrorMessages", typeof(ResourcesErrorMessages).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Перезаписывает свойство CurrentUICulture текущего потока для всех
        ///   обращений к ресурсу с помощью этого класса ресурса со строгой типизацией.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Authorization error.
        /// </summary>
        internal static string AuthError {
            get {
                return ResourceManager.GetString("AuthError", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на User authorization token timed out.
        /// </summary>
        internal static string AuthTimeout {
            get {
                return ResourceManager.GetString("AuthTimeout", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Current e-mail is not valid.
        /// </summary>
        internal static string EmailNotValid {
            get {
                return ResourceManager.GetString("EmailNotValid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на The gift olready owned.
        /// </summary>
        internal static string GiftReferenceOwned {
            get {
                return ResourceManager.GetString("GiftReferenceOwned", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Login already exists.
        /// </summary>
        internal static string LoginExists {
            get {
                return ResourceManager.GetString("LoginExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Mail already exists.
        /// </summary>
        internal static string MailExists {
            get {
                return ResourceManager.GetString("MailExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на There is no such gift.
        /// </summary>
        internal static string NoGift {
            get {
                return ResourceManager.GetString("NoGift", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на There is no such gift geference .
        /// </summary>
        internal static string NoGiftReference {
            get {
                return ResourceManager.GetString("NoGiftReference", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на User has no open session.
        /// </summary>
        internal static string NoOpenSession {
            get {
                return ResourceManager.GetString("NoOpenSession", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на No important parameters in request.
        /// </summary>
        internal static string NoParameters {
            get {
                return ResourceManager.GetString("NoParameters", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на User have to be authorized for this action.
        /// </summary>
        internal static string NotAuthorized {
            get {
                return ResourceManager.GetString("NotAuthorized", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Reference is not valid.
        /// </summary>
        internal static string ReferenceNotValid {
            get {
                return ResourceManager.GetString("ReferenceNotValid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Wrong date format.
        /// </summary>
        internal static string WrongDateFormat {
            get {
                return ResourceManager.GetString("WrongDateFormat", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Wrong gift id format: id mast be a number.
        /// </summary>
        internal static string WrongIdFormat {
            get {
                return ResourceManager.GetString("WrongIdFormat", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Wrong login or password.
        /// </summary>
        internal static string WrongLoginPassword {
            get {
                return ResourceManager.GetString("WrongLoginPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Ищет локализованную строку, похожую на Wrong format of authorization token.
        /// </summary>
        internal static string WrongTokenGuidFormat {
            get {
                return ResourceManager.GetString("WrongTokenGuidFormat", resourceCulture);
            }
        }
    }
}
