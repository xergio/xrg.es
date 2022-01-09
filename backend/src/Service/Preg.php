<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;
use App\Entity\PregDTO;

class Preg
{
    private string $hash;

    public function __construct(private readonly PregDTO $dto)
    {
        $this->hash = base_convert(substr(hash('sha256', serialize($this->dto)), 0, 10), 16, 36);
    }

    public function exec(): PregResponse
    {
        //if ($this->dto->pattern === '') {
        //    return new PregResponse();
        //}

        $cn = 'App\Service\Preg'.$this->dto->method->name;
        return (new $cn($this->dto))->exec();
    }

    protected function exec_preg_match(): array
    {
        $ret = @preg_match($this->dto->pattern, $this->dto->subject, $matches, $this->flags, $this->dto->offset);

        $error = $this->last_error();

        return array_merge($this->result($ret), [
            "dump" => $error?: $matches,
            "error" => (bool)$error,
            "code" => $this->syntax()
        ]);
    }

    protected function exec_preg_match_all(): array
    {
        $ret = @preg_match_all($this->pattern, $this->subject, $matches, $this->flags, $this->offset);

        $error = $this->last_error();

        return array_merge($this->result($ret), [
            "dump" => $error?: $matches,
            "error" => (bool)$error,
            "code" => $this->syntax()
        ]);
    }

    protected function exec_preg_split()
    {
        $ret = @preg_split($this->pattern, $this->subject, $this->limit, $this->flags);

        $error = $this->last_error();

        return array_merge($this->result($ret), [
            "dump" => $error?: $ret,
            "error" => (bool)$error,
            "code" => $this->syntax()
        ]);
    }

    protected function exec_preg_replace()
    {
        $ret = @preg_replace($this->pattern, $this->replacement, $this->subject, $this->limit);

        $error = $this->last_error();

        return array_merge($this->result($ret), [
            "dump" => $error?: $ret,
            "error" => (bool)$error,
            "code" => $this->syntax()
        ]);
    }

    protected function exec_preg_quote()
    {
        $ret = @preg_quote($this->pattern, $this->delimeter);

        $error = $this->last_error();

        return array_merge($this->result($ret), [
            "dump" => $error?: $ret,
            "error" => (bool)$error,
            "code" => $this->syntax()
        ]);
    }

    public function getHash(): string
    {
        return $this->hash;
    }
}
