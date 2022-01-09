<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregDTO;
use App\Entity\PregResponse;
use App\Resource\Flags;

/**
 * Base class for all Preg* methods.
 */
abstract class PregFunction
{
    /**
     * Build on construction to pass the flags to each preg function.
     */
    protected int $flags = 0;

    /**
     * Flag list as string for future representation, based on $flags.
     */
    protected array $flagsStr = [];

    /**
     * Available flags for each function.
     * @var array<Flags>
     */
    protected array $availableFlags = [];

    abstract public function exec(): PregResponse;
    abstract protected function syntax(): string;

    public function __construct(protected readonly PregDTO $dto)
    {
        foreach ($this->availableFlags as $flag) {
            if ($this->dto->{$flag->name}) {
                $this->flags |= \constant($flag->name);
                $this->flagsStr[] = $flag->name;
            }
        }
    }

    protected function result(mixed $ret): array
    {
        $gettype = \gettype($ret);
        $return = [$gettype];

        if (\in_array($gettype, ["boolean", "integer", "NULL"])) {
            $return[] = json_encode($ret);

        } elseif ($gettype === 'string') {
            $return[] = "len(". mb_strlen($ret). ")";

        } elseif ($gettype === 'array') {
            $return[] = "count(". count($ret). ")";
        }

        return $return;
    }

    /**
     * Can be used to remove some parts from the syntax() output.
     * @see syntax()
     */
    protected function syntaxCleanup(string $code): string
    {
        return str_replace(
            ['?&gt;', '&lt;?php&nbsp;', '&nbsp;', '<code>', '</code>'],
            ['', '', ' ', '', ''],
            highlight_string('<?php '. $code .' ?'.'>', true)
        );
    }

    protected function cropString(string $str, int $len = 50, bool $quote = true, string $longText = '$subject'): string
    {
        if (mb_strlen($str, "utf-8") < $len) {
            return $quote? '"'. addslashes($str) .'"': $str;
        }
        return $longText;
        //return str_replace(["\r", "\n"], ['\r', '\n'], addslashes(mb_substr($str, 0, $len, "utf-8")). "...");
    }
}