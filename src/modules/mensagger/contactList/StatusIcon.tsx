import {UserStatus} from "@/types/types";

export function StatusIcon({userStatus}: {userStatus: UserStatus | undefined}) {
  switch (userStatus) {
    case UserStatus.Online:
      return <div>online</div>;

    case UserStatus.Away:
      // Devuelve un ícono o cualquier contenido para "away"
      return <div>Away</div>; // O reemplázalo por un ícono correspondiente.

    case UserStatus.Offline:
      return <div>offline</div>;

    case UserStatus.Busy:
      // Puedes agregar un ícono o un estado para "busy" si es necesario.
      return <div>Busy</div>;

    default:
      return null; // Devuelve null o algo en caso de un valor desconocido.
  }
}
